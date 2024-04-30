import { Directive, ElementRef, HostListener, OnInit, EventEmitter } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
    selector: 'input[type="checkbox"][mdc-check]'
})
export class MdcCheckDirective implements OnInit {
    public inputStatus: EventEmitter<boolean | null> = new EventEmitter(false);

    private get HtmlInput(): HTMLInputElement {
        return this.el.nativeElement as HTMLInputElement;
    }

    @HostListener('change', ['$event']) onChange(event): void {
        this.inputStatus.next((event.target as HTMLInputElement).checked);
    }

    constructor(private el: ElementRef) {
        this.inputStatus.pipe(untilDestroyed(this)).subscribe((value: boolean | null) => {
            this.updateElementStatus(value);
        });
    }

    ngOnInit(): void {
        this.HtmlInput.classList.add('mdc-control');
        this.inputStatus.next(this.HtmlInput.checked);
    }

    private updateElementStatus(status: boolean | null): void {
        if (status === null) {
            this.HtmlInput.checked = false;
            this.HtmlInput.indeterminate = true;
            return;
        }

        this.HtmlInput.indeterminate = false;
        this.HtmlInput.checked = status;
    }
}
