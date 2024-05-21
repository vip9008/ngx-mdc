import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdcButtonComponent } from './mdc-button.component';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';
import { MdcButtonGroupDirective } from './mdc-button-group.directive';
import { MdcFabComponent } from './mdc-fab/mdc-fab.component';
import { MdcFabButtonDirective } from './mdc-fab/mdc-fab-button.directive';
import { MdcFabLabelDirective } from './mdc-fab/mdc-fab-label.directive';
import { MdcCommonModule } from '../mdc-common/mdc-common.module';

@NgModule({
    declarations: [
        MdcButtonComponent,
        MdcButtonGroupDirective,
        MdcFabComponent,
        MdcFabButtonDirective,
        MdcFabLabelDirective
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        MdcCommonModule,
        MdcIconModule,
        MdcButtonComponent,
        MdcButtonGroupDirective,
        MdcFabComponent,
        MdcFabButtonDirective,
        MdcFabLabelDirective
    ]
})
export class MdcButtonModule {}
