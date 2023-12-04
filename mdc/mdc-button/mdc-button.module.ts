import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdcButtonComponent } from './mdc-button.component';
import { MdcButtonGroupComponent } from './mdc-button-group/mdc-button-group.component';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';

@NgModule({
    declarations: [
        MdcButtonComponent,
        MdcButtonGroupComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MdcIconModule
    ],
    exports: [
        MdcButtonComponent,
        MdcButtonGroupComponent
    ]
})
export class MdcButtonModule {}
