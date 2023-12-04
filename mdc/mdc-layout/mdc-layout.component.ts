import { AfterViewInit, Component, ContentChild, ElementRef, Input } from '@angular/core';
import { MdcTopAppBarDirective } from './mdc-top-app-bar.directive';
import { MdcNavDrawerComponent } from './mdc-nav-drawer/mdc-nav-drawer.component';
import { NavDrawerToggleDirective } from './nav-drawer-toggle.directive';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'mdc-layout',
    templateUrl: './mdc-layout.component.html',
    styleUrls: ['./mdc-layout.component.scss']
})
export class MdcLayoutComponent implements AfterViewInit {
    @Input() TopAppBarType: 'standard' | 'standard-hidden' = 'standard';

    @ContentChild(MdcTopAppBarDirective) topAppBar: MdcTopAppBarDirective;
    @ContentChild(MdcNavDrawerComponent) navDrawer: MdcNavDrawerComponent;
    @ContentChild(NavDrawerToggleDirective) navDrawerToggle: NavDrawerToggleDirective;

    constructor(
        private el: ElementRef
    ) {
    }

    ngAfterViewInit(): void {
        if (this.topAppBar) {
            this.topAppBar.el.nativeElement.classList.add(this.TopAppBarType);
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
