import { ApplicationRef, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MdcDialogContainerComponent } from './mdc-dialog-container/mdc-dialog-container.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EventType, Router } from '@angular/router';

@UntilDestroy()
@Injectable({
    providedIn: 'root'
})
export class MdcDialogService {
    private dialogsStack: ComponentRef<MdcDialogContainerComponent>[] = [];

    constructor(
        private applicationRef: ApplicationRef,
        private router: Router
    ) {
        this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
            if (event.type == EventType.NavigationStart) {
                this.closeAllDialogs();
            }
        });
    }

    get rootViewContainerRef(): ViewContainerRef {
        const appInstance = this.applicationRef.components[0].instance;
    
        if (!appInstance.mdcComponentContainer) {
            const appName = this.applicationRef.componentTypes[0].name;
            throw new Error(`Missing @ViewChild(MdcHostDirective) declaration in ${appName}`);
        }
    
        return appInstance.mdcComponentContainer.viewContainerRef;
    }

    private get currentDialog(): ComponentRef<MdcDialogContainerComponent> {
        if (this.dialogsStack.length == 0) {
            return null;
        }

        return this.dialogsStack[this.dialogsStack.length - 1];
    }

    public createDialog<T = any>(dynamicComponent: any, data: Object = {}) {
        const componentRef: ComponentRef<T> = this.rootViewContainerRef.createComponent(dynamicComponent) as ComponentRef<T>;
        Object.assign(componentRef.instance, data);

        const dialogRef: ComponentRef<MdcDialogContainerComponent<T>> = this.rootViewContainerRef.createComponent(MdcDialogContainerComponent, {
            projectableNodes: [
                [componentRef.location.nativeElement]
            ]
        }) as ComponentRef<MdcDialogContainerComponent<T>>;

        dialogRef.instance.componentRef = componentRef;

        dialogRef.instance.dialogLoaded.pipe(untilDestroyed(this)).subscribe((loaded) => {
            if (loaded) {
                setTimeout(() => {dialogRef.instance.openDialog();}, 80);
            }
        });

        dialogRef.instance.dialogClosed.pipe(untilDestroyed(this)).subscribe((closed) => {
            if (closed) {
                this.dialogsStack.pop();
                setTimeout(() => {dialogRef.destroy();}, 320);
            }
        });

        this.dialogsStack.push(dialogRef);
        
        return dialogRef;
    }

    public closeDialog() {
        const dialogRef: ComponentRef<MdcDialogContainerComponent> = this.currentDialog;

        if (dialogRef) {
            dialogRef.instance.closeDialog();
        }
    }

    public closeAllDialogs() {
        if (this.dialogsStack.length == 0) {
            return;
        }

        for (let index = this.dialogsStack.length - 1; index >= 0; index--) {
            this.dialogsStack[index].instance.closeDialog();
        }
    }
}
