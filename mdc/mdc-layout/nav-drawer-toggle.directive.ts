import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[nav-drawer-toggle]'
})
export class NavDrawerToggleDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('nav-icon');
    }
}
