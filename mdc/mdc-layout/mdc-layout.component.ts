import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, HostListener, Input } from '@angular/core';
import { MdcTopAppBarDirective } from './mdc-top-app-bar.directive';
import { MdcNavDrawerComponent } from './mdc-nav-drawer/mdc-nav-drawer.component';
import { NavDrawerToggleDirective } from './nav-drawer-toggle.directive';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MdcMainContentDirective } from './mdc-main-content.directive';

@UntilDestroy()
@Component({
    selector: 'mdc-layout',
    templateUrl: './mdc-layout.component.html',
    styleUrls: ['./mdc-layout.component.scss']
})
export class MdcLayoutComponent implements AfterContentInit {
    @Input() fixedTopAppBar: boolean = false;

    @ContentChild(MdcTopAppBarDirective) topAppBar: MdcTopAppBarDirective;
    @ContentChild(MdcNavDrawerComponent) navDrawer: MdcNavDrawerComponent;
    @ContentChild(NavDrawerToggleDirective) navDrawerToggle: NavDrawerToggleDirective;
    @ContentChild(MdcMainContentDirective) mainContent!: MdcMainContentDirective;

    private lastScrollPosition: number = 0;

    constructor(
        private el: ElementRef
    ) {
    }

    ngAfterContentInit(): void {
        if (this.topAppBar && this.fixedTopAppBar) {
            this.topAppBar.el.nativeElement.classList.add('fixed');
            this.mainContent.el.nativeElement.classList.add('mdc-top-app-bar-visible');
        }

        if (this.navDrawer) {
            if (this.navDrawer.type == 'permanent') {
                this.el.nativeElement.classList.add('mdc-drawer-expand');
            }

            this.navDrawer.active.pipe(untilDestroyed(this)).subscribe((status) => {
                if (status) {
                    this.openNavDrawer();
                } else {
                    this.closeNavDrawer();
                }
            });

            fromEvent(this.navDrawerToggle.el.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
                this.navDrawerState(!this.navDrawer.active.value);
            });
        }

        this.topAppBarBehaviour();

        this.mainContent.el.nativeElement.addEventListener('scroll', () => {
            this.topAppBarBehaviour();
        });
    }

    private topAppBarBehaviour(): void {
        if (!this.topAppBar) {
            return;
        }

        let scroll: number = this.mainContent.el.nativeElement.scrollTop;
        let height: number = this.topAppBar.el.nativeElement.offsetHeight;

        if (this.fixedTopAppBar) {
            if (scroll > 0) {
                this.topAppBar.el.nativeElement.classList.add('active');
            } else {
                this.topAppBar.el.nativeElement.classList.remove('active');
            }
            
            this.lastScrollPosition = scroll;
            return;
        }

        if (scroll > height) {
            if (scroll > this.lastScrollPosition) {
                this.topAppBar.el.nativeElement.classList.remove('active');

                this.el.nativeElement.classList.add('mdc-top-app-bar-hidden');
                this.el.nativeElement.classList.remove('mdc-top-app-bar-visible');
            } else {
                this.topAppBar.el.nativeElement.classList.add('active', 'standard');

                this.el.nativeElement.classList.add('mdc-top-app-bar-visible');
                this.el.nativeElement.classList.remove('mdc-top-app-bar-hidden');
            }
            
            this.topAppBar.el.nativeElement.classList.add('standard-hidden');
        } else {
            if (scroll == 0) {
                this.topAppBar.el.nativeElement.classList.remove('active', 'standard');
            }
            
            this.topAppBar.el.nativeElement.classList.remove('standard-hidden');
            
            this.el.nativeElement.classList.remove('mdc-top-app-bar-hidden');
            this.el.nativeElement.classList.add('mdc-top-app-bar-visible');
        }

        this.lastScrollPosition = scroll;
    }

    private openNavDrawer() {
        if (this.navDrawer.type == 'modal') {
            this.el.nativeElement.classList.add('mdc-drawer-modal');
        } else {
            this.el.nativeElement.classList.add('mdc-drawer-expand');
        }
    }

    private closeNavDrawer() {
        if (this.navDrawer.type == 'persistent') {
            this.el.nativeElement.classList.remove('mdc-drawer-expand');
        }

        this.el.nativeElement.classList.remove('mdc-drawer-modal');
    }

    public navDrawerState(open: boolean) {
        if (!this.navDrawer) {
            return;
        }

        this.navDrawer.active.next(open);
    }
}
