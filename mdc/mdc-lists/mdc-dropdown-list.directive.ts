import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-dropdown-list]',
    host: {
        'class': 'mdc-dropdown'
    }
})
export class MdcDropdownListDirective {
}
