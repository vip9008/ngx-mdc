import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: 'data-table-footer',
    host: {
        'class': 'footer'
    }
})
export class DataTableFooterDirective {
}
