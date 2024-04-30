import { Directive } from '@angular/core';

@Directive({
    selector: 'data-table-header',
    host: {
        'class': 'header'
    }
})
export class DataTableHeaderDirective {
}
