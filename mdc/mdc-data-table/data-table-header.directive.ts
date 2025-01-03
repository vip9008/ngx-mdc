import { Directive } from '@angular/core';

@Directive({
  standalone: false,
    selector: 'data-table-header',
    host: {
        'class': 'header'
    }
})
export class DataTableHeaderDirective {
}
