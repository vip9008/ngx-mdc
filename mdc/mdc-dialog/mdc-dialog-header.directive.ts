import { Directive } from '@angular/core';

@Directive({
    selector: 'mdc-dialog-header',
    host: {
        'class': 'dialog-header'
    }
})
export class MdcDialogHeaderDirective {
}
