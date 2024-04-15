import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[mdc-card-action]'
})
export class CardActionDirective {
    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('mdc-card-primary');
    }
}
