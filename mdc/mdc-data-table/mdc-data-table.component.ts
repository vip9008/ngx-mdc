import { Component } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-data-table',
    templateUrl: './mdc-data-table.component.html',
    styleUrl: './mdc-data-table.component.scss',
    host: {
        'class': 'mdc-data-table'
    }
})
export class MdcDataTableComponent {
}
