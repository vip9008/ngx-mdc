import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarDirective } from './mdc-top-app-bar.directive';
import { MdcLayoutComponent } from './mdc-layout.component';
import { MdcNavDrawerComponent } from './mdc-nav-drawer/mdc-nav-drawer.component';
import { NavDrawerToggleDirective } from './nav-drawer-toggle.directive';



@NgModule({
    declarations: [
        MdcLayoutComponent,
        MdcTopAppBarDirective,
        MdcNavDrawerComponent,
        NavDrawerToggleDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcLayoutComponent,
        MdcTopAppBarDirective,
        MdcNavDrawerComponent,
        NavDrawerToggleDirective
    ]
})
export class MdcLayoutModule { }
