import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: 'mdc-dialog-header'
})
export class MdcDialogHeaderDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('header');
    }
}
