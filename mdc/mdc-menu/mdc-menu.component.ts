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
    styleUrls: ['./mdc-menu.component.scss']
})
export class MdcMenuComponent implements AfterViewInit {
    @Input() closeOnAction: boolean = true;
    @Input() reverseDirection: boolean = false;

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
        return getComputedStyle(this.menuContainer.el.nativeElement).direction.toLowerCase() as 'ltr' | 'rtl';
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private el: ElementRef
    ) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-menu-container');

        if (this.reverseDirection) {
            this.el.nativeElement.classList.add('reverse');
        }

        fromEvent(this.menuButton.el.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
            if (this.activeMenu) {
                let classList = this.menuButton.el.nativeElement.classList;

                if (classList.contains('mdc-text-field') && (classList.contains('mdc-searchable') || classList.contains('mdc-editable'))) {
                    return;
                }

                this.closeMenu();
            } else {
                this.openMenu();
            }
        });

        this.menuCloseItems.forEach((menuClose, index) => {
            fromEvent(menuClose.el.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
                this.closeMenu();
            });
        });

        if (this.closeOnAction) {
            fromEvent(this.menuContainer.el.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event: any) => {
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
            this.menuContainer.el.nativeElement.removeAttribute('style');

            let viewportWidth = document.documentElement.clientWidth || document.body.clientWidth;
            let viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;

            let menuHeight = this.menuContainer.el.nativeElement.offsetHeight;
            let menuWidth = this.menuContainer.el.nativeElement.offsetWidth;

            if (this.menuButton.el.nativeElement.classList.contains('mdc-text-field')) {
                menuWidth = this.menuButton.el.nativeElement.offsetWidth;
            }

            let menuPosition = this.menuContainer.el.nativeElement.getBoundingClientRect();

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
                position.bottom = '1rem';
            } else {
                position.top = menuPosition.top.toString() + 'px';
            }

            let menuDirection = this.direction;

            if (menuDirection == 'ltr' || (menuDirection == 'rtl' && this.reverseDirection)) {
                position.left = menuPosition.left.toString() + "px";
                position.right = "auto";

                if ((menuPosition.left + menuWidth) > viewportWidth) {
                    position.right = '1rem';
                    position.left = "auto";
                }
            } else if (menuDirection == 'rtl' || (menuDirection == 'ltr' && this.reverseDirection)) {
                position.right = (viewportWidth - menuPosition.right).toString() + "px";
                position.left = "auto";
                if ((menuPosition.right - menuWidth) < 0) {
                    position.left = '1rem';
                    position.right = "auto";
                }
            }

            position.width = (menuWidth + (baseSize * 1.5)).toString() + 'px';

            Object.assign(this.menuContainer.el.nativeElement.style, position);
        }
    }

    closeMenu(): void {
        this.activeMenu = false;
        this.updateDomStatus();
    }

    private updateDomStatus(): void {
        if (this.activeMenu) {
            this.el.nativeElement.classList.add('active');
            this.menuButton.el.nativeElement.classList.add('active');
        } else {
            this.el.nativeElement.classList.remove('active');
            this.menuButton.el.nativeElement.classList.remove('active');
        }
    }
}
