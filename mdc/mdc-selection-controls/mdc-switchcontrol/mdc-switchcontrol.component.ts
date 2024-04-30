import { Component, ContentChild } from '@angular/core';
import { MdcSwitchDirective } from './mdc-switch.directive';

@Component({
    selector: 'mdc-switchcontrol',
    templateUrl: './mdc-switchcontrol.component.html',
    styleUrls: ['./mdc-switchcontrol.component.scss'],
    host: {
        'class': 'mdc-switch'
    }
})
export class MdcSwitchcontrolComponent {
    @ContentChild(MdcSwitchDirective) switchInput: MdcSwitchDirective;
}
