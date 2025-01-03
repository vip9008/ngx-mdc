import { Component } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-card',
    templateUrl: './mdc-card.component.html',
    styleUrls: ['./mdc-card.component.scss'],
    host: {
        'class': 'mdc-card'
    }
})
export class MdcCardComponent {
    // constructor(private el: ElementRef) {
    // }
}
