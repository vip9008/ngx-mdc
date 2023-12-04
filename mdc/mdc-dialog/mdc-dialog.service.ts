import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, ComponentRef, Inject, Injectable, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { MdcDialogContainerComponent } from './mdc-dialog-container/mdc-dialog-container.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
    providedIn: 'root'
})
export class MdcDialogService {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private applicationRef: ApplicationRef
    ) {
    }

    get rootViewContainerRef(): ViewContainerRef {
        const appInstance = this.applicationRef.components[0].instance;
    
        if (!appInstance.viewContainerRef) {
            const appName = this.applicationRef.componentTypes[0].name;
            throw new Error(`Missing 'viewContainerRef' declaration in ${appName} constructor`);
        }
    
        return appInstance.viewContainerRef;
    }

    createDialog(dynamicComponent: any, data: Object = {}) {
        const componentRef: ComponentRef<any> = this.rootViewContainerRef.createComponent(dynamicComponent);
        Object.assign(componentRef.instance, data);

        const dialogRef: ComponentRef<MdcDialogContainerComponent> = this.rootViewContainerRef.createComponent(MdcDialogContainerComponent, {
            projectableNodes: [
                [componentRef.location.nativeElement]
            ]
        });

        dialogRef.instance.dialogLoaded.pipe(untilDestroyed(this)).subscribe((loaded) => {
            if (loaded) {
                setTimeout(() => {dialogRef.instance.openDialog();}, 80);
            }
        });

        dialogRef.instance.dialogClosed.pipe(untilDestroyed(this)).subscribe((closed) => {
            if (closed) {
                setTimeout(() => {dialogRef.destroy();}, 320);
            }
        });

        componentRef.instance.mdcDialogRef = dialogRef;
        
        return dialogRef;
    }
}
