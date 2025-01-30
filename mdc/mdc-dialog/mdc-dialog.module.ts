import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcDialogHeaderDirective } from './mdc-dialog-header.directive';
import { MdcDialogBodyDirective } from './mdc-dialog-body.directive';
import { MdcButtonModule } from '../mdc-button/mdc-button.module';
import { MdcDialogContainerComponent } from './mdc-dialog-container/mdc-dialog-container.component';
import { MdcDialogDirective } from './mdc-dialog.directive';
import { MdcFullScreenDirective } from './mdc-full-screen.directive';

@NgModule({
    declarations: [
        MdcDialogContainerComponent,
        MdcDialogDirective,
        MdcFullScreenDirective,
        MdcDialogHeaderDirective,
        MdcDialogBodyDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcDialogDirective,
        MdcFullScreenDirective,
        MdcDialogHeaderDirective,
        MdcDialogBodyDirective
    ]
})
export class MdcDialogModule { }
