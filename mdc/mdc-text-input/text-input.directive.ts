import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, AfterViewInit, Output, EventEmitter, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

@Directive({
    selector: '[text-input]'
})
export class TextInputDirective implements AfterViewInit, OnDestroy {
    private inputChanges: MutationObserver;
    @Output() public domChange = new EventEmitter();

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private el: ElementRef
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.inputChanges = new MutationObserver((mutations: MutationRecord[]) => {
                mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
            });
    
            this.inputChanges.observe(this.el.nativeElement, {
                attributes: true
            });
        }
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('input-element');
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.inputChanges.disconnect();
        }
    }

    get element(): ElementRef {
        return this.el;
    }
}
