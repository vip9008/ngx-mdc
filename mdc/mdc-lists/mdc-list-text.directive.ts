import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: 'mdc-list-text'
})
export class MdcListTextDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('text');
    }
}
