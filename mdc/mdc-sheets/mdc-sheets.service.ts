import { ApplicationRef, ComponentRef, effect, Injectable, ViewContainerRef } from '@angular/core';
import { MdcSideSheetComponent } from './mdc-side-sheet/mdc-side-sheet.component';
import { EventType, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MdcLayoutService } from '../mdc-layout/mdc-layout.service';

@UntilDestroy()
@Injectable({
    providedIn: 'root'
})
export class MdcSheetsService {
    private sideSheetRef: ComponentRef<MdcSideSheetComponent> = null;

    constructor(
        private applicationRef: ApplicationRef,
        private router: Router,
        private layoutService: MdcLayoutService
    ) {
        this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
            if (event.type == EventType.NavigationStart) {
                this.closeSideSheet();
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
        return this.sideSheetRef;
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

                if (type == 'coplanar') {
                    this.layoutService.layoutStatus = {
                        sideSheetFixed: true
                    };
                }
            }
        });

        dialogRef.instance.sheetClosed.pipe(untilDestroyed(this)).subscribe((closed) => {
            if (closed) {
                this.sideSheetRef = null;
                setTimeout(() => {dialogRef.destroy();}, 320);

                if (type == 'coplanar') {
                    this.layoutService.layoutStatus = {
                        sideSheetFixed: false
                    };
                }
            }
        });

        this.sideSheetRef = dialogRef;
        
        return dialogRef;
    }

    public closeSideSheet() {
        const dialogRef: ComponentRef<MdcSideSheetComponent> = this.currentSideSheet;

        if (dialogRef) {
            dialogRef.instance.closeSheet();
        }
    }
}
