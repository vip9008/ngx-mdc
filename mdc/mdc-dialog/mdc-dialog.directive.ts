import { Directive } from '@angular/core';

@Directive({
    selector: '[mdc-dialog]',
    host: {
        'class': 'mdc-dialog'
    }
})
export class MdcDialogDirective {
}
