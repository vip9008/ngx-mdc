import { Component, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'mdc-dialog-container',
    templateUrl: './mdc-dialog-container.component.html',
    styleUrls: ['./mdc-dialog-container.component.scss']
})
export class MdcDialogContainerComponent implements AfterViewInit {
    @Output() dialogLoaded: EventEmitter<boolean> = new EventEmitter(false);
    @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter(true);

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-dialog-container');
        this.dialogLoaded.emit(true);
    }

    public openDialog() {
        this.el.nativeElement.classList.add('active');
        this.dialogClosed.emit(false);
    }

    public closeDialog() {
        this.el.nativeElement.classList.remove('active');
        this.dialogClosed.emit(true);
    }
}
