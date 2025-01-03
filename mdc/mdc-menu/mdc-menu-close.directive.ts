import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-menu-close]',
    host: {
        'class': 'menu-close'
    }
})
export class MdcMenuCloseDirective {
    constructor(private el: ElementRef) {
    }

    public get element(): ElementRef {
        return this.el;
    }
}
