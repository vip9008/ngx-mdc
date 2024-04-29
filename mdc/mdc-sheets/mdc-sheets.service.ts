import { ApplicationRef, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MdcSideSheetComponent } from './mdc-side-sheet/mdc-side-sheet.component';
import { EventType, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
    providedIn: 'root'
})
export class MdcSheetsService {
    private sideSheetsStack: ComponentRef<MdcSideSheetComponent>[] = [];

    constructor(
        private applicationRef: ApplicationRef,
        private router: Router
    ) {
        this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
            if (event.type == EventType.NavigationStart) {
                this.closeAllSideSheet();
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

    private get currentSideSheet(): ComponentRef<MdcSideSheetComponent> {
        if (this.sideSheetsStack.length == 0) {
            return null;
        }

        return this.sideSheetsStack[this.sideSheetsStack.length - 1];
    }

    public createSideSheet(dynamicComponent: any, type: 'above-content' | 'coplanar' | 'modal' = 'above-content', data: Object = {}) {
        const componentRef: ComponentRef<any> = this.rootViewContainerRef.createComponent(dynamicComponent);
        Object.assign(componentRef.instance, data);

        const dialogRef: ComponentRef<MdcSideSheetComponent> = this.rootViewContainerRef.createComponent(MdcSideSheetComponent, {
            projectableNodes: [
                [componentRef.location.nativeElement]
            ]
        });

        dialogRef.instance.type = type;

        dialogRef.instance.sheetLoaded.pipe(untilDestroyed(this)).subscribe((loaded) => {
            if (loaded) {
                setTimeout(() => {dialogRef.instance.openSheet();}, 80);
            }
        });

        dialogRef.instance.sheetClosed.pipe(untilDestroyed(this)).subscribe((closed) => {
            if (closed) {
                this.sideSheetsStack.pop();
                setTimeout(() => {dialogRef.destroy();}, 320);
            }
        });

        this.sideSheetsStack.push(dialogRef);
        
        return dialogRef;
    }

    public closeSideSheet() {
        const dialogRef: ComponentRef<MdcSideSheetComponent> = this.currentSideSheet;

        if (dialogRef) {
            dialogRef.instance.closeSheet();
        }
    }

    public closeAllSideSheet() {
        if (this.sideSheetsStack.length == 0) {
            return;
        }

        for (let index = this.sideSheetsStack.length - 1; index >= 0; index--) {
            this.sideSheetsStack[index].instance.closeSheet();
        }
    }
}
