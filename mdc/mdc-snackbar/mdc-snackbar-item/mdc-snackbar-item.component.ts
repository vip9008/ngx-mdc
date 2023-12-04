import { Component, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'mdc-snackbar-item',
    templateUrl: './mdc-snackbar-item.component.html',
    styleUrls: ['./mdc-snackbar-item.component.scss']
})
export class MdcSnackbarItemComponent implements AfterViewInit {
    @Input() message: string;
    @Input() closeButton: string = null;
    @Output() hideMessage: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-snackbar');
    }

    show(): void {
        this.el.nativeElement.classList.add('active');
    }

    hide(): void {
        this.el.nativeElement.classList.remove('active');
    }
}
