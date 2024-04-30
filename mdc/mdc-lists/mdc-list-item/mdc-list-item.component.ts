import { Component } from '@angular/core';

@Component({
    selector: 'div[mdc-list-item], button[mdc-list-item], a[mdc-list-item], label[mdc-list-item]',
    templateUrl: './mdc-list-item.component.html',
    styleUrls: ['./mdc-list-item.component.scss'],
    host: {
        'class': 'mdc-list-item'
    }
})
export class MdcListItemComponent {
}
