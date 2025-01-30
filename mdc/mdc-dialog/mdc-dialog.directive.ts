import { Directive } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[mdc-dialog]',
    host: {
        'class': 'mdc-dialog'
    }
})
export class MdcDialogDirective {
}
