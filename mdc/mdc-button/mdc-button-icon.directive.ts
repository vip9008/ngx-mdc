import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-button-icon]',
    host: {
        'class': 'icon'
    }
})
export class MdcButtonIconDirective {
}
