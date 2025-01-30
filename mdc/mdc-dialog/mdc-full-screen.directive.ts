import { Directive } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[mdc-full-screen]',
    host: {
        'class': 'mdc-full-screen'
    }
})
export class MdcFullScreenDirective {
}
