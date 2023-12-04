import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'div[mdc-button-group], div[mdc-toggle-buttons]',
    templateUrl: './mdc-button-group.component.html',
    styleUrls: ['./mdc-button-group.component.scss']
})
export class MdcButtonGroupComponent implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-button-group')) {
            this.el.nativeElement.classList.add('mdc-button-group');
        } else if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-toggle-buttons')) {
            this.el.nativeElement.classList.add('mdc-toggle-buttons');
        }
    }
}
