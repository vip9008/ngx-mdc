import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcSnackbarsComponent } from './mdc-snackbars/mdc-snackbars.component';
import { MdcSnackbarHostComponent } from './mdc-snackbar-host/mdc-snackbar-host.component';
import { MdcSnackbarItemComponent } from './mdc-snackbar-item/mdc-snackbar-item.component';
import { MdcButtonModule } from '../mdc-button/mdc-button.module';
import { TranslateModule } from '@ngx-translate/core';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';

@NgModule({
    declarations: [
        MdcSnackbarsComponent,
        MdcSnackbarHostComponent,
        MdcSnackbarItemComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MdcIconModule,
        MdcButtonModule
    ],
    exports: [
        MdcSnackbarsComponent
    ]
})
export class MdcSnackbarModule { }
