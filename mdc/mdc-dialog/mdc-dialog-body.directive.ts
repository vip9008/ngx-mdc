import { Directive } from '@angular/core';

@Directive({
    selector: 'mdc-dialog-body',
    host: {
        'class': 'dialog-body'
    }
})
export class MdcDialogBodyDirective {
}
