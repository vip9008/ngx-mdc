import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdcButtonComponent } from './mdc-button.component';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';
import { MdcButtonGroupDirective } from './mdc-button-group.directive';
import { MdcButtonIconDirective } from './mdc-button-icon.directive';

@NgModule({
    declarations: [
        MdcButtonComponent,
        MdcButtonGroupDirective,
        MdcButtonIconDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        MdcIconModule
    ],
    exports: [
        MdcButtonComponent,
        MdcButtonGroupDirective,
        MdcButtonIconDirective
    ]
})
export class MdcButtonModule {}
