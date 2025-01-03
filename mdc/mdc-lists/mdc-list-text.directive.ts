import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: 'mdc-list-text',
    host: {
        'class': 'text'
    }
})
export class MdcListTextDirective {
}
