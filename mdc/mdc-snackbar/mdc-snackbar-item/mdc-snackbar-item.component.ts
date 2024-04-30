import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'mdc-snackbar-item',
    templateUrl: './mdc-snackbar-item.component.html',
    styleUrls: ['./mdc-snackbar-item.component.scss'],
    host: {
        'class': 'mdc-snackbar'
    }
})
export class MdcSnackbarItemComponent {
    @Input() message: string;
    @Input() closeButton: string = null;
    @Output() hideMessage: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    constructor(private el: ElementRef) {
    }

    show(): void {
        this.el.nativeElement.classList.add('active');
    }

    hide(): void {
        this.el.nativeElement.classList.remove('active');
    }
}
