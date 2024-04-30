import { Directive } from '@angular/core';

@Directive({
    selector: 'mdc-list-container',
    host: {
        'class': 'mdc-list-container'
    }
})
export class MdcListContainerDirective {
}
