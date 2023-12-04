import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcProgressIndicatorComponent } from './mdc-progress-indicator.component';
import { MdcProgressSpinnerComponent } from './mdc-progress-spinner/mdc-progress-spinner.component';



@NgModule({
    declarations: [
        MdcProgressIndicatorComponent,
        MdcProgressSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcProgressIndicatorComponent,
        MdcProgressSpinnerComponent
    ]
})
export class MdcProgressIndicatorModule { }
