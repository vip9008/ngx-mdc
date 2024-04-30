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

    public createSideSheet<T = any>(dynamicComponent: any, type: 'above-content' | 'coplanar' | 'modal' = 'above-content', data: Object = {}): ComponentRef<MdcSideSheetComponent<T>> | null {
        if (this.currentSideSheet) {
            return null;
        }

        const componentRef: ComponentRef<T> = this.rootViewContainerRef.createComponent(dynamicComponent) as ComponentRef<T>;
        Object.assign(componentRef.instance, data);

        const sheetRef: ComponentRef<MdcSideSheetComponent<T>> = this.rootViewContainerRef.createComponent(MdcSideSheetComponent, {
            projectableNodes: [
                [componentRef.location.nativeElement]
            ]
        }) as ComponentRef<MdcSideSheetComponent<T>>;

        sheetRef.instance.type = type;
        sheetRef.instance.componentRef = componentRef;

        sheetRef.instance.sheetLoaded.pipe(untilDestroyed(this)).subscribe((loaded) => {
            if (loaded) {
                setTimeout(() => {sheetRef.instance.openSheet();}, 80);

                if (type == 'coplanar') {
                    this.layoutService.layoutStatus = {
                        sideSheetFixed: true
                    };
                }
            }
        });

        sheetRef.instance.sheetClosed.pipe(untilDestroyed(this)).subscribe((closed) => {
            if (closed) {
                this.sideSheetRef = null;
                setTimeout(() => {sheetRef.destroy();}, 320);

                if (type == 'coplanar') {
                    this.layoutService.layoutStatus = {
                        sideSheetFixed: false
                    };
                }
            }
        });

        this.sideSheetRef = sheetRef;
        
        return sheetRef;
    }

    public closeSideSheet() {
        const sheetRef: ComponentRef<MdcSideSheetComponent> = this.currentSideSheet;

        if (sheetRef) {
            sheetRef.instance.closeSheet();
        }
    }
}
