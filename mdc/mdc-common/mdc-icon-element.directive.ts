import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[mdc-icon-element]'
})
export class MdcIconElementDirective {
    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('icon');
    }
}
