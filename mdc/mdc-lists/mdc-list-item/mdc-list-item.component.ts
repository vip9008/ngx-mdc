import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'div[mdc-list-item], button[mdc-list-item], a[mdc-list-item], label[mdc-list-item]',
    templateUrl: './mdc-list-item.component.html',
    styleUrls: ['./mdc-list-item.component.scss']
})
export class MdcListItemComponent implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-list-item');
    }
}
