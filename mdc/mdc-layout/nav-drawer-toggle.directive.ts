import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[nav-drawer-toggle]',
    host: {
        'class': 'nav-icon'
    }
})
export class NavDrawerToggleDirective {
    constructor(private el: ElementRef) {
    }

    public get element(): ElementRef {
        return this.el;
    }
}
