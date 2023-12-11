import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'data-table-header'
})
export class DataTableHeaderDirective implements AfterViewInit {
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('header');
    }
}
