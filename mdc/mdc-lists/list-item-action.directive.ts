import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-item-action]',
  host: {
        'class': 'mdc-list-item-primary'
    }
})
export class ListItemActionDirective {
}
