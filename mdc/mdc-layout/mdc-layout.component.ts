import { AfterContentInit, AfterViewInit, Component, ContentChild, effect, ElementRef, HostListener, Input } from '@angular/core';
import { MdcTopAppBarDirective } from './mdc-top-app-bar.directive';
import { MdcNavDrawerComponent } from './mdc-nav-drawer/mdc-nav-drawer.component';
import { NavDrawerToggleDirective } from './nav-drawer-toggle.directive';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MdcMainContentDirective } from './mdc-main-content.directive';
import { MdcLayoutService } from './mdc-layout.service';
import { LayoutStatus } from './layout-status.interface';

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
        private el: ElementRef,
        private layoutService: MdcLayoutService
    ) {
        effect(() => {
            const status = this.layoutService.layoutStatus;

            let addClasses: string[] = [];
            let removeClasses: string[] = [];

            status.drawerExpand ? addClasses.push('mdc-drawer-expand') : removeClasses.push('mdc-drawer-expand');
            status.drawerModal ? addClasses.push('mdc-drawer-modal') : removeClasses.push('mdc-drawer-modal');
            status.sideSheetFixed ? addClasses.push('mdc-sheets-side-fixed') : removeClasses.push('mdc-sheets-side-fixed');
            status.topAppBarHidden ? addClasses.push('mdc-top-app-bar-hidden') : removeClasses.push('mdc-top-app-bar-hidden');
            status.topAppBarVisible ? addClasses.push('mdc-top-app-bar-visible') : removeClasses.push('mdc-top-app-bar-visible');

            if (addClasses.length) {
                this.el.nativeElement.classList.add(...addClasses);
            }

            if (removeClasses.length) {
                this.el.nativeElement.classList.remove(...removeClasses);
            }
        });
    }

    ngAfterContentInit(): void {
        let layoutStatus: LayoutStatus = {};

        if (this.topAppBar && this.fixedTopAppBar) {
            this.topAppBar.el.nativeElement.classList.add('fixed');
            layoutStatus.topAppBarVisible = true;
        }

        if (this.navDrawer) {
            if (this.navDrawer.type == 'permanent') {
                layoutStatus.drawerExpand = true;
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

        this.layoutService.layoutStatus = layoutStatus;

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
        let layoutStatus: LayoutStatus = {};

        if (this.fixedTopAppBar) {
            if (scroll > 0) {
                this.topAppBar.el.nativeElement.classList.add('active');
            } else {
                this.topAppBar.el.nativeElement.classList.remove('active');
            }
            
            this.lastScrollPosition = scroll;
            return;
        }

        if (scroll > 0) {
            if (scroll > this.lastScrollPosition) {
                this.topAppBar.el.nativeElement.classList.remove('active');
                
                layoutStatus.topAppBarHidden = true;
                layoutStatus.topAppBarVisible = false;
            } else {
                this.topAppBar.el.nativeElement.classList.add('active', 'standard');
                
                layoutStatus.topAppBarHidden = false;
                layoutStatus.topAppBarVisible = true;
            }
            
            this.topAppBar.el.nativeElement.classList.add('standard-hidden');
        } else {
            if (scroll == 0) {
                this.topAppBar.el.nativeElement.classList.remove('active', 'standard');
            }
            
            this.topAppBar.el.nativeElement.classList.remove('standard-hidden');
                
            layoutStatus.topAppBarHidden = false;
            layoutStatus.topAppBarVisible = true;
        }

        this.lastScrollPosition = scroll;
        this.layoutService.layoutStatus = layoutStatus;
    }

    private openNavDrawer() {
        if (this.navDrawer.type == 'modal') {
            this.layoutService.layoutStatus = {
                drawerModal: true
            };
        } else {
            this.layoutService.layoutStatus = {
                drawerExpand: true
            };
        }
    }

    private closeNavDrawer() {
        let layoutStatus: LayoutStatus = {};

        if (this.navDrawer.type == 'persistent') {
            layoutStatus.drawerExpand = false;
        }
        
        layoutStatus.drawerModal = false;

        this.layoutService.layoutStatus = layoutStatus;
    }

    public navDrawerState(open: boolean) {
        if (!this.navDrawer) {
            return;
        }

        this.navDrawer.active.next(open);
    }
}
