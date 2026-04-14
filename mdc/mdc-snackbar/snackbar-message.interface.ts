import { Type } from "@angular/core";

export interface SnackbarInstance {
    request: SnackbarRequest;
    visible: boolean;
}

export interface SnackbarMessage {
    message: string | {
        msg: string,
        args: Object
    },
    closeButton?: string,
    closeIcon?: boolean,
    duration?: number | false
}

export interface SnackbarOpenOptions {
    stacked?: boolean;
    duration?: number | false;
    closeButton?: string;
    closeIcon?: boolean;
    actionColor?: string;
}

export interface SnackbarComponentConfig<TInputs = any> {
    component: Type<any>;
    inputs?: TInputs;
}

export interface SnackbarRequest {
    id: string;
    kind: 'default' | 'component';
    options: SnackbarOpenOptions;

    message?: SnackbarMessage;
    componentConfig?: SnackbarComponentConfig;
}