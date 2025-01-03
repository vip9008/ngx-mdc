import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: 'mdc-dialog-body',
    host: {
        'class': 'dialog-body'
    }
})
export class MdcDialogBodyDirective {
}
