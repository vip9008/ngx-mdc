import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SnackbarMessage } from '../snackbar-message.interface';

@Component({
    standalone: false,
    selector: 'mdc-snackbar-item',
    templateUrl: './mdc-snackbar-item.component.html',
    styleUrls: ['./mdc-snackbar-item.component.scss'],
    'host': {
        '[class.stacked]': 'stacked',
    },
})
export class MdcSnackbarItemComponent {
    @Input({ required: true }) message: SnackbarMessage;
    @Input() stacked: boolean = false;
    @Input() actionColor: string;
    @Output() hideMessage: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    public get messageString(): string {
        if (typeof this.message?.message !== 'string') {
            return this.message?.message?.msg;
        }

        return this.message?.message;
    }

    public get messageArgs(): Object {
        if (typeof this.message?.message !== 'string') {
            return this.message?.message?.args;
        }

        return {};
    }
}
