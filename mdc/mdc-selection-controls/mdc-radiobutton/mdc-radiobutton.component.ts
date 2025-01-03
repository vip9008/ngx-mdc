import { Component, ContentChild } from '@angular/core';
import { MdcRadioDirective } from './mdc-radio.directive';

@Component({
    standalone: false,
    selector: 'mdc-radiobutton',
    templateUrl: './mdc-radiobutton.component.html',
    styleUrls: ['./mdc-radiobutton.component.scss'],
    host: {
        'class': 'mdc-radiobutton'
    }
})
export class MdcRadiobuttonComponent {
    @ContentChild(MdcRadioDirective) radioInput: MdcRadioDirective;
}
