import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcFullWidthDirective } from './mdc-full-width.directive';
import { MdcIconElementDirective } from './mdc-icon-element.directive';
import { MdcDividerComponent } from './mdc-divider/mdc-divider.component';

@NgModule({
    declarations: [
        MdcFullWidthDirective,
        MdcIconElementDirective,
        MdcDividerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcFullWidthDirective,
        MdcIconElementDirective,
        MdcDividerComponent
    ]
})
export class MdcCommonModule { }
