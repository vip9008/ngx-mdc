import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    standalone: false,
    selector: 'div[mdc-button-group], div[mdc-toggle-buttons]',
})
export class MdcButtonGroupDirective implements OnInit {
    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-button-group')) {
            this.el.nativeElement.classList.add('mdc-button-group');
        } else if ((this.el.nativeElement.attributes).hasOwnProperty('mdc-toggle-buttons')) {
            this.el.nativeElement.classList.add('mdc-toggle-buttons');
        }
    }
}
