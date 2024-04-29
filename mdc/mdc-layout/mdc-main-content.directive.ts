import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[id="mdc-main-content"]'
})
export class MdcMainContentDirective {
    constructor(public el: ElementRef) {
    }
}
