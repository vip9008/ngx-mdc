import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-full-width]',
    host: {
        'class': 'full-width'
    }
})
export class MdcFullWidthDirective {
}
