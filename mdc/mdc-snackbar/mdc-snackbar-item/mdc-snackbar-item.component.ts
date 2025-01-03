import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SnackbarMessage } from '../snackbar-message.interface';

@Component({
    standalone: false,
    selector: 'mdc-snackbar-item',
    templateUrl: './mdc-snackbar-item.component.html',
    styleUrls: ['./mdc-snackbar-item.component.scss'],
    host: {
        'class': 'mdc-snackbar'
    }
})
export class MdcSnackbarItemComponent {
    @Input() message: SnackbarMessage;
    @Input() actionColor: string;
    @Output() hideMessage: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    public get messageString(): string {
        if (typeof this.message?.message != 'string') {
            return this.message?.message?.msg;
        }

        return this.message?.message;
    }

    public get messageArgs(): Object {
        if (typeof this.message?.message != 'string') {
            return this.message?.message?.args;
        }

        return {};
    }

    constructor(private el: ElementRef) {
    }

    show(): void {
        this.el.nativeElement.classList.add('active');
    }

    hide(): void {
        this.el.nativeElement.classList.remove('active');
    }
}
