import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-list-group]',
    host: {
        'class': 'mdc-list-group'
    }
})
export class MdcListGroupDirective {
}
