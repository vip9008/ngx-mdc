import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTextInputComponent } from './mdc-text-input.component';
import { TextInputDirective } from './text-input.directive';
import { InputErrorComponent } from './input-error/input-error.component';
import { CapitalizePipe } from '@pipes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        MdcTextInputComponent,
        TextInputDirective,
        InputErrorComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        CapitalizePipe
    ],
    exports: [
        MdcTextInputComponent,
        TextInputDirective
    ]
})
export class MdcTextInputModule { }
