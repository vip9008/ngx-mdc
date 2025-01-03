import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-full-width]',
    host: {
        'class': 'full-width'
    }
})
export class MdcFullWidthDirective {
}
