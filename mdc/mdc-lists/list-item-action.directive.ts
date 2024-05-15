import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-item-action]',
  host: {
        'class': 'mdc-list-item-primary'
    }
})
export class ListItemActionDirective {
}
