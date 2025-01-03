import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-card-action]',
    host: {
        'class': 'mdc-card-primary'
    }
})
export class CardActionDirective {
}
