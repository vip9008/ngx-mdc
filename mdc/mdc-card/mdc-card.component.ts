import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'mdc-card',
    templateUrl: './mdc-card.component.html',
    styleUrls: ['./mdc-card.component.scss']
})
export class MdcCardComponent implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-card');
    }
}
