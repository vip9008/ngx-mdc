import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcDataTableComponent } from './mdc-data-table.component';
import { DataTableHeaderDirective } from './data-table-header.directive';
import { DataTableFooterDirective } from './data-table-footer.directive';



@NgModule({
    declarations: [
        MdcDataTableComponent,
        DataTableHeaderDirective,
        DataTableFooterDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcDataTableComponent,
        DataTableHeaderDirective,
        DataTableFooterDirective
    ]
})
export class MdcDataTableModule { }
