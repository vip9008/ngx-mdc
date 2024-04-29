import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcSideSheetComponent } from './mdc-side-sheet/mdc-side-sheet.component';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';



@NgModule({
    declarations: [
        MdcSideSheetComponent
    ],
    imports: [
        CommonModule,
        MdcIconModule
    ],
    exports: [
    ]
})
export class MdcSheetsModule { }
