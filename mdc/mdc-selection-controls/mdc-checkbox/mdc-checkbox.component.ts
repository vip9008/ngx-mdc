import { Component, ContentChild } from '@angular/core';
import { MdcCheckDirective } from './mdc-check.directive';

@Component({
    selector: 'mdc-checkbox',
    templateUrl: './mdc-checkbox.component.html',
    styleUrls: ['./mdc-checkbox.component.scss'],
    host: {
        'class': 'mdc-checkbox'
    }
})
export class MdcCheckboxComponent {
    @ContentChild(MdcCheckDirective) checkboxInput: MdcCheckDirective;
}
