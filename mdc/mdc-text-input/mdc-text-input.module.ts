import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTextInputComponent } from './mdc-text-input.component';
import { TextInputDirective } from './text-input.directive';
import { MdcInputErrorComponent } from '../mdc-common/input-error/input-error.component';

@NgModule({
    declarations: [
        MdcTextInputComponent,
        TextInputDirective
    ],
    imports: [
        CommonModule,
        MdcInputErrorComponent
    ],
    exports: [
        MdcTextInputComponent,
        TextInputDirective
    ]
})
export class MdcTextInputModule { }
