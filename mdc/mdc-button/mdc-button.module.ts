import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdcButtonComponent } from './mdc-button.component';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';
import { MdcButtonGroupDirective } from './mdc-button-group.directive';

@NgModule({
    declarations: [
        MdcButtonComponent,
        MdcButtonGroupDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        MdcIconModule
    ],
    exports: [
        MdcButtonComponent,
        MdcButtonGroupDirective
    ]
})
export class MdcButtonModule {}
