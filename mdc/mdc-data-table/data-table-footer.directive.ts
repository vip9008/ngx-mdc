import { Directive } from '@angular/core';

@Directive({
    selector: 'data-table-footer',
    host: {
        'class': 'footer'
    }
})
export class DataTableFooterDirective {
}
