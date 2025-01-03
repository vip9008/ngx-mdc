import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-icon-element]',
    host: {
        'class': 'icon'
    }
})
export class MdcIconElementDirective {
}
