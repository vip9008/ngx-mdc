import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcDialogHeaderDirective } from './mdc-dialog-header.directive';
import { MdcDialogBodyDirective } from './mdc-dialog-body.directive';
import { MdcButtonModule } from '../mdc-button/mdc-button.module';
import { MdcDialogContainerComponent } from './mdc-dialog-container/mdc-dialog-container.component';
import { MdcDialogDirective } from './mdc-dialog.directive';

@NgModule({
    declarations: [
        MdcDialogContainerComponent,
        MdcDialogDirective,
        MdcDialogHeaderDirective,
        MdcDialogBodyDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcDialogContainerComponent,
        MdcDialogDirective,
        MdcDialogHeaderDirective,
        MdcDialogBodyDirective
    ]
})
export class MdcDialogModule { }
