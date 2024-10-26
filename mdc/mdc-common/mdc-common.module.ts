import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcFullWidthDirective } from './mdc-full-width.directive';
import { MdcIconElementDirective } from './mdc-icon-element.directive';
import { MdcDividerComponent } from './mdc-divider/mdc-divider.component';
import { MdcTooltipDirective } from './mdc-tooltip.directive';

@NgModule({
    declarations: [
        MdcFullWidthDirective,
        MdcIconElementDirective,
        MdcDividerComponent,
        MdcTooltipDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcFullWidthDirective,
        MdcIconElementDirective,
        MdcDividerComponent,
        MdcTooltipDirective
    ]
})
export class MdcCommonModule { }
