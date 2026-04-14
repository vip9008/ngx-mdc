import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarMessage, SnackbarOpenOptions, SnackbarRequest } from './snackbar-message.interface';

@Injectable({
    providedIn: 'root'
})
export class SnackbarsService {
    private messageSubject = new Subject<SnackbarRequest>();
    private dismissSubject = new Subject<string>();
    private dismissAllSubject = new Subject<void>();

    public get message(): Observable<SnackbarRequest> {
        return this.messageSubject.asObservable();
    }

    public get dismissed(): Observable<string> {
        return this.dismissSubject.asObservable();
    }

    public get dismissedAll(): Observable<void> {
        return this.dismissAllSubject.asObservable();
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }

    public open(message: SnackbarMessage, stacked: boolean = false): string {
        const normalizedMessage: SnackbarMessage = {
            ...message,
            duration: this.normalizeDuration(message?.duration)
        };

        const id: string = this.generateId();

        this.messageSubject.next({
            id: id,
            kind: 'default',
            message: normalizedMessage,
            options: {
                stacked: stacked,
                duration: normalizedMessage.duration,
                closeButton: normalizedMessage.closeButton,
                closeIcon: normalizedMessage.closeIcon
            }
        });

        return id;
    }

    public openComponent<TInputs>(
        component: Type<any>,
        inputs?: TInputs,
        options?: SnackbarOpenOptions
    ): string {
        const duration = this.normalizeDuration(options?.duration);
        const id: string = this.generateId();

        this.messageSubject.next({
            id: id,
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

        return id;
    }

    public dismiss(id: string): void {
        this.dismissSubject.next(id);
    }

    public dismissAll(): void {
        this.dismissAllSubject.next();
    }

    private normalizeDuration(duration: number | false = 4000): number | false {
        if (duration === false) {
            return false;
        }

        if (duration < 4000) {
            duration = 4000;
        }

        if (duration > 10000) {
            duration = 10000;
        }

        return duration - 200;
    }
}
