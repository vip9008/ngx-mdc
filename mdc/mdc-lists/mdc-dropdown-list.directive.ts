import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[mdc-dropdown-list]'
})
export class MdcDropdownListDirective {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('mdc-dropdown');
    }
}
