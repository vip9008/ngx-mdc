import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-dropdown-list]',
    host: {
        'class': 'mdc-dropdown'
    }
})
export class MdcDropdownListDirective {
}
