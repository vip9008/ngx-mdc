import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutStatus } from './layout-status.interface';

interface LayoutClass {
    className: string;
    add: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class MdcLayoutService {
    private layoutStatusSignal = signal<LayoutStatus>({
        drawerModal: false,
        drawerExpand: false,
        topAppBarVisible: false,
        topAppBarHidden: false,
        sideSheetFixed: false
    });

    constructor() {
    }

    public set layoutStatus(value: LayoutStatus) {
        this.layoutStatusSignal.update((status: LayoutStatus) => {
            return {...status, ...value};
        });
    }

    public get layoutStatus(): LayoutStatus {
        return this.layoutStatusSignal();
    }
}
