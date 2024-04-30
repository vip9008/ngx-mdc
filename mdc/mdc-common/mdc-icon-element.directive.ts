import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-icon-element]',
    host: {
        'class': 'icon'
    }
})
export class MdcIconElementDirective {
}
