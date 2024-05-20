import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';

@Directive({
    selector: '[slider-input]',
    host: {
        'class': 'slider-input'
    }
})
export class SliderInputDirective {
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

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.inputChanges.disconnect();
        }
    }

    get element(): ElementRef {
        return this.el;
    }
}
