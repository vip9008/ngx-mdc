import { AfterViewInit, Component, Input } from '@angular/core';
import { timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnackbarsService } from '../snackbars.service';
import { SnackbarInstance, SnackbarRequest } from '../snackbar-message.interface';

@UntilDestroy()
@Component({
    standalone: false,
    selector: 'mdc-snackbars',
    templateUrl: './mdc-snackbars.component.html',
    styleUrls: ['./mdc-snackbars.component.scss']
})
export class MdcSnackbarsComponent implements AfterViewInit {
    private messageQueue: SnackbarRequest[] = [];
    public visibleMessages: SnackbarInstance[] = [];

    @Input() position: 'start' | 'center' | 'end' = 'center';
    @Input() standardStyle: boolean = false;
    @Input() theme: 'light' | 'dark' | '' = '';
    @Input() actionColor: string = 'accent-color';

    @Input() multiple: boolean = false;
    @Input() maxVisible: number = 3;

    public get themeClass(): string[] {
        const cssClass: string[] = [];

        switch (this.theme) {
            case 'light': cssClass.push('md-theme-dark'); break;
            case 'dark': cssClass.push('md-theme-light'); break;
        }

        switch (this.position) {
            case 'start': cssClass.push('position-start'); break;
            case 'end': cssClass.push('position-end'); break;
        }

        return cssClass;
    }

    constructor(private snackbarsService: SnackbarsService) {
    }

    ngAfterViewInit(): void {
        this.snackbarsService.message.pipe(untilDestroyed(this)).subscribe((request) => {
            if (!request) {
                return;
            }

            if (!this.multiple) {
                this.messageQueue.push(request);

                if (!this.visibleMessages.length) {
                    this.activateNextQueued();
                }

                return;
            }

            if (this.visibleMessages.length >= this.maxVisible) {
                this.messageQueue.push(request);
                return;
            }

            this.showRequest(request);
        });
    }

    private activateNextQueued(): void {
        if (!this.messageQueue.length || this.visibleMessages.length) {
            return;
        }

        this.showRequest(this.messageQueue.shift()!);
    }

    private showRequest(request: SnackbarRequest): void {
        const instance: SnackbarInstance = {
            id: this.generateId(),
            request,
            visible: true
        };

        this.visibleMessages.push(instance);

        if (request.options.duration !== false) {
            timer(request.options.duration).pipe(untilDestroyed(this)).subscribe(() => {
                this.dismissById(instance.id);
            });
        }
    }

    public dismissById(id: string): void {
        const instance = this.visibleMessages.find((item) => item.id === id);

        if (!instance || !instance.visible) {
            return;
        }

        instance.visible = false;

        timer(200).pipe(untilDestroyed(this)).subscribe(() => {
            this.visibleMessages = this.visibleMessages.filter((item) => item.id !== id);

            if (!this.multiple) {
                this.activateNextQueued();
                return;
            }

            if (this.messageQueue.length && this.visibleMessages.length < this.maxVisible) {
                this.showRequest(this.messageQueue.shift()!);
            }
        });
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
}