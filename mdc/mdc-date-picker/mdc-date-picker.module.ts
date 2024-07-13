import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcDateInputComponent } from './mdc-date-input/mdc-date-input.component';
import { MdcTextInputModule } from '../mdc-text-input/mdc-text-input.module';
import { TextInputDirective } from '../mdc-text-input/text-input.directive';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';

@NgModule({
    declarations: [
        MdcDateInputComponent
    ],
    imports: [
        CommonModule,
        MdcIconModule
    ],
    exports: [
        MdcDateInputComponent,
        MdcTextInputModule
    ]
})
export class MdcDatePickerModule { }
