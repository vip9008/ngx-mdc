import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackbarMessage } from './snackbar-message.interface';

@Injectable({
    providedIn: 'root'
})
export class SnackbarsService {
    private messageSubject: BehaviorSubject<SnackbarMessage>;

    constructor() {
        this.messageSubject = new BehaviorSubject<SnackbarMessage>(null);
    }

    public get message(): Observable<SnackbarMessage> {
        return this.messageSubject.asObservable();
    }

    public open(message: SnackbarMessage) {
        if (!message.duration || message.duration < 4000) {
            message.duration = 4000;
        }

        if (message.duration > 10000) {
            message.duration = 10000;
        }

        message.duration -= 200;

        this.messageSubject.next(message);
    }
}
