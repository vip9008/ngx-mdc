import { Directive } from '@angular/core';

@Directive({
    selector: 'mdc-list-text',
    host: {
        'class': 'text'
    }
})
export class MdcListTextDirective {
}
