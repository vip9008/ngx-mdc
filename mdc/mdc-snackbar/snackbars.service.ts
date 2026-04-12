import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarMessage, SnackbarOpenOptions, SnackbarRequest } from './snackbar-message.interface';

@Injectable({
    providedIn: 'root'
})
export class SnackbarsService {
    private messageSubject = new Subject<SnackbarRequest>();

    public get message(): Observable<SnackbarRequest> {
        return this.messageSubject.asObservable();
    }

    public open(message: SnackbarMessage, stacked: boolean = false): void {
        const normalizedMessage: SnackbarMessage = {
            ...message,
            duration: this.normalizeDuration(message?.duration)
        };

        this.messageSubject.next({
            kind: 'default',
            message: normalizedMessage,
            options: {
                stacked: stacked,
                duration: normalizedMessage.duration,
                closeButton: normalizedMessage.closeButton,
                closeIcon: normalizedMessage.closeIcon
            }
        });
    }

    public openComponent<TInputs>(
        component: Type<any>,
        inputs?: TInputs,
        options?: SnackbarOpenOptions
    ): void {
        const duration = this.normalizeDuration(options?.duration);

        this.messageSubject.next({
            kind: 'component',
            options: {
                ...options,
                duration
            },
            componentConfig: {
                component,
                inputs
            }
        });
    }

    private normalizeDuration(duration?: number): number {
        let value = duration ?? 4000;

        if (value < 4000) {
            value = 4000;
        }

        if (value > 10000) {
            value = 10000;
        }

        return value - 200;
    }
}
