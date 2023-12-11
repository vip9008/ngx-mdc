import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'data-table-footer'
})
export class DataTableFooterDirective implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('footer');
    }
}
