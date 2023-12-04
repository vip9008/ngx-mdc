import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: 'mdc-list-container'
})
export class MdcListContainerDirective implements OnInit {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('mdc-list-container');
    }
}
