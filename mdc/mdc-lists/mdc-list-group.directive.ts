import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[mdc-list-group]'
})
export class MdcListGroupDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('mdc-list-group');
    }
}
