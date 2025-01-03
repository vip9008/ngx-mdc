import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { SnackbarsService } from '../snackbars.service';
import { Subscription, timer } from 'rxjs';
import { MdcSnackbarItemComponent } from '../mdc-snackbar-item/mdc-snackbar-item.component';
import { SnackbarMessage } from '../snackbar-message.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    standalone: false,
    selector: 'mdc-snackbars',
    templateUrl: './mdc-snackbars.component.html',
    styleUrls: ['./mdc-snackbars.component.scss']
})
export class MdcSnackbarsComponent implements AfterViewInit {
    @ViewChild(MdcSnackbarItemComponent) snackbarItem: MdcSnackbarItemComponent;
    private messageTimer: Subscription = null;
    private messageStack: SnackbarMessage[] = [];
    public activeMessage: SnackbarMessage = null;

    @Input() startPosition: boolean = false;
    @Input() standardStyle: boolean = false;
    @Input() theme: 'light' | 'dark' | '' = '';
    @Input() actionColor: string = 'accent-color';

    public get themeClass(): string {
        switch (this.theme) {
            case 'light': return 'md-theme-dark';
            case 'dark': return 'md-theme-light';
            default: return '';
        }
    }

    constructor(
        private snackbarsService: SnackbarsService
    ) {
    }

    ngAfterViewInit(): void {
        this.snackbarsService.message.pipe(untilDestroyed(this)).subscribe((message) => {
            this.messageStack.push(message);

            if (!this.activeMessage) {
                this.activateMessage(this.messageStack.shift());
            }
        });
    }

    private activateMessage(message: SnackbarMessage): void {
        if (message == null) {
            return;
        }

        if (this.messageTimer) {
            this.messageTimer.unsubscribe();
        }

        this.activeMessage = message;
        this.snackbarItem.show();
        this.messageTimer = timer(this.activeMessage.duration).pipe(untilDestroyed(this)).subscribe(() => {
            this.hideMessage();
        });
    }

    private hideMessage(): void {
        this.snackbarItem.hide();

        timer(200).pipe(untilDestroyed(this)).subscribe(() => {
            this.activeMessage = null;
            if (this.messageStack.length) {
                this.activateMessage(this.messageStack.shift());
            }
        });
    }

    public dismiss(state: boolean): void {
        if (state == false) {
            return;
        }

        this.messageTimer.unsubscribe();
        this.hideMessage();
    }
}
