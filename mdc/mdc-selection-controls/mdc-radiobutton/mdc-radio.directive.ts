import { Directive, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
    selector: 'input[type="radio"][mdc-radio]'
})
export class MdcRadioDirective implements OnInit {
    public inputStatus: EventEmitter<boolean>;

    private get HtmlInput(): HTMLInputElement {
        return this.el.nativeElement as HTMLInputElement;
    }

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        this.HtmlInput.classList.add('mdc-control');
        
        this.inputStatus = new EventEmitter(this.HtmlInput.checked);
        this.inputStatus.pipe(untilDestroyed(this)).subscribe((value: boolean) => {
            this.HtmlInput.checked = value;
        });
    }
}
