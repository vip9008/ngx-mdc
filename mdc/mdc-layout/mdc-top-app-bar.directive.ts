import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'header[id="mdc-top-app-bar"]'
})
export class MdcTopAppBarDirective {
    constructor(public el: ElementRef) {
    }
}
