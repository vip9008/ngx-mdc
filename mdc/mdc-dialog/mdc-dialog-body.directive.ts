import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: 'mdc-dialog-body'
})
export class MdcDialogBodyDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('body');
    }
}
