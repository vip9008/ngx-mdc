import { Directive } from '@angular/core';

@Directive({
    selector: 'mdc-dialog-header',
    host: {
        'class': 'header'
    }
})
export class MdcDialogHeaderDirective {
}
