import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, AfterViewInit, ContentChild, Inject, PLATFORM_ID, HostListener, ContentChildren, QueryList, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { MdcMenuButtonDirective } from './mdc-menu-button.directive';
import { MdcMenuCloseDirective } from './mdc-menu-close.directive';
import { MdcMenuContainerDirective } from './mdc-menu-container.directive';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'mdc-menu',
    templateUrl: './mdc-menu.component.html',
    styleUrls: ['./mdc-menu.component.scss'],
    host: {
        'class': 'mdc-menu-container'
    }
})
export class MdcMenuComponent implements AfterViewInit {
    @Input() closeOnAction: boolean = true;
    @Input() reverseDirection: boolean = false;
    @Input() openDirection: 'top' | 'bottom' = 'top';

    private activeMenu: boolean = false;

    @ContentChild(MdcMenuButtonDirective) menuButton: MdcMenuButtonDirective;
    @ContentChild(MdcMenuContainerDirective) menuContainer: MdcMenuContainerDirective;
    @ContentChildren(MdcMenuCloseDirective, { descendants: true }) menuCloseItems: QueryList<MdcMenuCloseDirective>;

    @HostListener('window:resize', ['$event'])
    @HostListener('window:scroll', ['$event'])
    closeEvent(event) {
        if (this.activeMenu) {
            this.closeMenu();
        }
    }

    private get baseSize(): number {
        let baseSize = getComputedStyle(this.el.nativeElement).getPropertyValue('font-size');
        return Number(baseSize.match(/\d+/)[0]);
    }

    private get direction(): 'ltr' | 'rtl' {
        return getComputedStyle(this.menuContainer.element.nativeElement).direction.toLowerCase() as 'ltr' | 'rtl';
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private el: ElementRef
    ) {
    }

    ngAfterViewInit(): void {
        if (this.reverseDirection) {
            this.el.nativeElement.classList.add('reverse');
        }

        fromEvent(this.menuButton.element.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
            if (this.activeMenu) {
                let classList = this.menuButton.element.nativeElement.classList;

                if (classList.contains('mdc-text-field') && (classList.contains('mdc-searchable') || classList.contains('mdc-editable'))) {
                    return;
                }

                this.closeMenu();
            } else {
                this.openMenu();
            }
        });

        this.menuCloseItems.forEach((menuClose, index) => {
            fromEvent(menuClose.element.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
                this.closeMenu();
            });
        });

        if (this.closeOnAction) {
            fromEvent(this.menuContainer.element.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event: any) => {
                if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) {
                    this.closeMenu();
                }
            });
        }
    }

    openMenu(): void {
        this.activeMenu = true;
        this.updateDomStatus();

        if (isPlatformBrowser(this.platformId)) {
            let baseSize = this.baseSize;
            this.menuContainer.element.nativeElement.removeAttribute('style');

            let viewportWidth = document.documentElement.clientWidth || document.body.clientWidth;
            let viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;

            let adiitionalMargin = baseSize * 1.5;
            let menuHeight = this.menuContainer.element.nativeElement.offsetHeight;
            let menuWidth = this.menuContainer.element.nativeElement.offsetWidth + adiitionalMargin;

            if (this.menuButton.element.nativeElement.classList.contains('mdc-text-field')) {
                menuWidth = this.menuButton.element.nativeElement.offsetWidth;
            }

            let menuPosition = this.menuButton.element.nativeElement.getBoundingClientRect();

            let position: any = {
                "top": "auto",
                "right": "auto",
                "bottom": "auto",
                "left": "auto",
                "width": "auto",
                "min-width": "auto",
                "max-width": "none",
                "position": "fixed"
            };

            if ((menuPosition.top + menuHeight) > viewportHeight) {
                position.bottom = baseSize.toString() + 'rem';
            } else {
                position.top = menuPosition.top.toString() + 'px';
            }

            if (this.openDirection == 'bottom') {
                if (menuPosition.bottom - menuHeight > baseSize) {
                    this.el.nativeElement.classList.add('bottom');
                    position.top = 'auto';
                    position.bottom = (viewportHeight - menuPosition.bottom).toString() + 'px';
                } else {
                    this.el.nativeElement.classList.remove('bottom');
                }
            }

            position.width = menuWidth.toString() + 'px';

            let menuDirection = this.direction;

            if ((menuDirection == 'ltr' && !this.reverseDirection) || (menuDirection == 'rtl' && this.reverseDirection)) {
                position.left = menuPosition.left.toString() + "px";
                position.right = "auto";

                if ((menuPosition.left + menuWidth) > viewportWidth) {
                    position.right = '1rem';
                    position.left = "auto";
                }
            } else if ((menuDirection == 'rtl' && !this.reverseDirection) || (menuDirection == 'ltr' && this.reverseDirection)) {
                position.right = (viewportWidth - menuPosition.right).toString() + "px";
                position.left = "auto";
                if ((menuPosition.right - menuWidth) < 0) {
                    position.left = '1rem';
                    position.right = "auto";
                }
            }

            Object.assign(this.menuContainer.element.nativeElement.style, position);
        }
    }

    closeMenu(): void {
        this.activeMenu = false;
        this.updateDomStatus();
    }

    private updateDomStatus(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.activeMenu) {
                this.el.nativeElement.classList.add('active');
                this.menuButton.element.nativeElement.classList.add('active');
            } else {
                this.el.nativeElement.classList.remove('active');
                this.menuButton.element.nativeElement.classList.remove('active');
            }
        }
    }
}
