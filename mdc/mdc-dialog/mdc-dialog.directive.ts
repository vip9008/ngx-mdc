import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[mdc-dialog]'
})
export class MdcDialogDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('mdc-dialog');
    }
}
