import { Directive, ElementRef, EventEmitter, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  standalone: false,
    selector: 'input[type="checkbox"][mdc-switch]'
})
export class MdcSwitchDirective implements OnInit {
    public inputStatus: EventEmitter<boolean> = new EventEmitter();

    private get HtmlInput(): HTMLInputElement {
        return this.el.nativeElement as HTMLInputElement;
    }

    public get inputValue(): boolean {
        return this.HtmlInput.checked;
    }

    @HostListener('change', ['$event']) onChange(event): void {
        this.inputStatus.next((event.target as HTMLInputElement).checked);
    }

    constructor(private el: ElementRef) {
        this.inputStatus.pipe(untilDestroyed(this)).subscribe((value: boolean) => {
            this.HtmlInput.checked = value;
        });
    }

    ngOnInit(): void {
        this.HtmlInput.classList.add('mdc-control');
        this.inputStatus.next(this.HtmlInput.checked);
    }
}
