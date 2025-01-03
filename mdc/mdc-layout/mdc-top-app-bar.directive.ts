import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: false,
    selector: 'header[id="mdc-top-app-bar"]'
})
export class MdcTopAppBarDirective {
    @Input() fixed: boolean = false;

    constructor(private el: ElementRef) {
    }

    public get element(): ElementRef {
        return this.el;
    }
}
