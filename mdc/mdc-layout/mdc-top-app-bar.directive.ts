import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: 'header[id="mdc-top-app-bar"]'
})
export class MdcTopAppBarDirective {
    @Input() fixed: boolean = false;

    constructor(public el: ElementRef) {
    }
}
