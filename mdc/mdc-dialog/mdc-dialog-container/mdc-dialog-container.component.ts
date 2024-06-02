import { Component, ElementRef, Output, EventEmitter, AfterContentInit, ComponentRef } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'mdc-dialog-container',
    templateUrl: './mdc-dialog-container.component.html',
    styleUrls: ['./mdc-dialog-container.component.scss'],
    host: {
        'class': 'mdc-dialog-container'
    }
})
export class MdcDialogContainerComponent<T = any> implements AfterContentInit {
    @Output() dialogLoaded: EventEmitter<boolean> = new EventEmitter(false);
    @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter(true);

    public componentRef: ComponentRef<T>;

    constructor(private el: ElementRef) {
    }
    
    ngAfterContentInit(): void {
        this.dialogLoaded.emit(true);
    }

    public showDialog() {
        this.el.nativeElement.classList.add('active');
    }

    public openDialog() {
        this.showDialog();
        this.dialogClosed.emit(false);
    }

    public hideDialog() {
        this.el.nativeElement.classList.remove('active');
    }

    public closeDialog() {
        this.hideDialog();
        this.dialogClosed.emit(true);
    }
}
