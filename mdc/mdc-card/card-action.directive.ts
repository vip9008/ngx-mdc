import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-card-action]',
    host: {
        'class': 'mdc-card-primary'
    }
})
export class CardActionDirective {
}
