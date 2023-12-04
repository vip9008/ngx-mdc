import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcSnackbarsComponent } from './mdc-snackbars/mdc-snackbars.component';
import { MdcSnackbarItemComponent } from './mdc-snackbar-item/mdc-snackbar-item.component';
import { MdcButtonModule } from '../mdc-button/mdc-button.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        MdcSnackbarsComponent,
        MdcSnackbarItemComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MdcButtonModule
    ],
    exports: [
        MdcSnackbarsComponent
    ]
})
export class MdcSnackbarModule { }
