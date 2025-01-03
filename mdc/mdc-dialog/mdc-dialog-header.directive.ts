import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: 'mdc-dialog-header',
    host: {
        'class': 'dialog-header'
    }
})
export class MdcDialogHeaderDirective {
}
