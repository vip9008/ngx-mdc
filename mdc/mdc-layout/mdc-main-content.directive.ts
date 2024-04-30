import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[id="mdc-main-content"]'
})
export class MdcMainContentDirective {
    constructor(private el: ElementRef) {
    }

    public get element(): ElementRef {
        return this.el;
    }
}
