import { Directive, ElementRef, Renderer2, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Directive({
    selector: '[text-input]'
})
export class TextInputDirective implements AfterViewInit, OnDestroy {
    private inputChanges: MutationObserver;
    @Output() public domChange = new EventEmitter();

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.inputChanges = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
        });

        this.inputChanges.observe(this.el.nativeElement, {
            attributes: true
        });
    }

    ngAfterViewInit() {
        this.el.nativeElement.classList.add('input-element');
    }

    ngOnDestroy(): void {
        this.inputChanges.disconnect();
    }

    get element(): ElementRef {
        return this.el;
    }
}
