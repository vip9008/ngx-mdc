import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'mdc-data-table',
    templateUrl: './mdc-data-table.component.html',
    styleUrl: './mdc-data-table.component.scss'
})
export class MdcDataTableComponent implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-data-table');
    }
}
