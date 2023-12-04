import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[mdc-full-width]'
})
export class MdcFullWidthDirective implements OnInit {
    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('full-width');
    }
}
