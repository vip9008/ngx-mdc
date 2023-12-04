import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcListsModule } from '../mdc-lists/mdc-lists.module';
import { MdcCheckboxComponent } from './mdc-checkbox/mdc-checkbox.component';
import { MdcCheckDirective } from './mdc-checkbox/mdc-check.directive';
import { MdcRadiobuttonComponent } from './mdc-radiobutton/mdc-radiobutton.component';
import { MdcRadioDirective } from './mdc-radiobutton/mdc-radio.directive';
import { MdcSwitchcontrolComponent } from './mdc-switchcontrol/mdc-switchcontrol.component';
import { MdcSwitchDirective } from './mdc-switchcontrol/mdc-switch.directive';

@NgModule({
    declarations: [
        MdcCheckboxComponent,
        MdcCheckDirective,
        MdcRadiobuttonComponent,
        MdcRadioDirective,
        MdcSwitchcontrolComponent,
        MdcSwitchDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcCheckboxComponent,
        MdcCheckDirective,
        MdcRadiobuttonComponent,
        MdcRadioDirective,
        MdcSwitchcontrolComponent,
        MdcSwitchDirective,
        MdcListsModule
    ]
})
export class MdcSelectionControlsModule { }
