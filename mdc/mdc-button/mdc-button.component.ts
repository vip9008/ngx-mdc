import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'button[mdc-button], button[mdc-button-outlined], button[mdc-button-contained], a[mdc-button], a[mdc-button-outlined], a[mdc-button-contained]',
    templateUrl: './mdc-button.component.html',
    styleUrls: ['./mdc-button.component.scss']
})
export class MdcButtonComponent implements AfterViewInit {
    @Input() icon: String;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-button');

        if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-button-outlined')) {
            this.el.nativeElement.classList.add('btn-outlined');
        } else if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-button-contained')) {
            this.el.nativeElement.classList.add('btn-contained');
        }
    }
}
