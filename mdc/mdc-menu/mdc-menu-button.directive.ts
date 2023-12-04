import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[mdc-menu-button]'
})
export class MdcMenuButtonDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('menu-button');
    }
}
