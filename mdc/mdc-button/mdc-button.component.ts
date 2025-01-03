import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

@Component({
    standalone: false,
    selector: 'button[mdc-button], button[mdc-button-outlined], button[mdc-button-contained], a[mdc-button], a[mdc-button-outlined], a[mdc-button-contained]',
    templateUrl: './mdc-button.component.html',
    styleUrls: ['./mdc-button.component.scss'],
    host: {
        'class': 'mdc-button'
    }
})
export class MdcButtonComponent implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-button-outlined')) {
            this.el.nativeElement.classList.add('btn-outlined');
        } else if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-button-contained')) {
            this.el.nativeElement.classList.add('btn-contained');
        }
    }
}
