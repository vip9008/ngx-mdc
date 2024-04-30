import { Directive } from '@angular/core';

@Directive({
    selector: 'mdc-dialog-body',
    host: {
        'class': 'body'
    }
})
export class MdcDialogBodyDirective {
}
