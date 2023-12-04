import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[mdc-menu-close]'
})
export class MdcMenuCloseDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('menu-close');
    }
}
