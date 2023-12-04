import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[mdc-menu-container]'
})
export class MdcMenuContainerDirective {
    constructor(public el: ElementRef) {
        this.el.nativeElement.classList.add('menu-container');
    }
}
