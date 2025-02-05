import { Directive, ElementRef } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[mdc-menu-container]',
    host: {
        'class': 'menu-container'
    }
})
export class MdcMenuContainerDirective {
    constructor(private el: ElementRef) {
    }

    public get element(): ElementRef {
        return this.el;
    }
}
