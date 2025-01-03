import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: 'mdc-list-container',
    host: {
        'class': 'mdc-list-container'
    }
})
export class MdcListContainerDirective {
}
