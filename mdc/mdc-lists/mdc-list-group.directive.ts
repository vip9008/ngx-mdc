import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-list-group]',
    host: {
        'class': 'mdc-list-group'
    }
})
export class MdcListGroupDirective {
}
