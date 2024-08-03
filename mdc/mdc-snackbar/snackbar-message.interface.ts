export interface SnackbarMessage {
    message: string | {
        msg: string,
        args: Object
    },
    closeButton: string,
    duration?: number
}