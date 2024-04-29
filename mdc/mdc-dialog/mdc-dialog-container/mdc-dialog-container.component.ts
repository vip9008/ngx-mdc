import { Component, ElementRef, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'mdc-dialog-container',
    templateUrl: './mdc-dialog-container.component.html',
    styleUrls: ['./mdc-dialog-container.component.scss']
})
export class MdcDialogContainerComponent implements AfterContentInit {
    @Output() dialogLoaded: EventEmitter<boolean> = new EventEmitter(false);
    @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter(true);

    constructor(private el: ElementRef) {
        this.el.nativeElement.classList.add('mdc-dialog-container');
    }
    
    ngAfterContentInit(): void {
        this.dialogLoaded.emit(true);
        // timer(4000).subscribe(() => {
        // });
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
