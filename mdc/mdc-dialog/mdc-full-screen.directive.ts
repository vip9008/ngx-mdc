import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-full-screen]',
    host: {
        'class': 'mdc-full-screen'
    }
})
export class MdcFullScreenDirective {
}
