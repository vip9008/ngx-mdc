import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-menu-button]',
    host: {
        'class': 'menu-button'
    }
})
export class MdcMenuButtonDirective {
    constructor(private el: ElementRef) {
    }

    public get element(): ElementRef {
        return this.el;
    }
}
