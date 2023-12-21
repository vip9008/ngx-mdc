import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTabsComponent } from './mdc-tabs.component';
import { MdcTabPageComponent } from './mdc-tab-page/mdc-tab-page.component';
import { MdcTabItemComponent } from './mdc-tab-item/mdc-tab-item.component';



@NgModule({
    declarations: [
        MdcTabsComponent,
        MdcTabItemComponent,
        MdcTabPageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcTabsComponent,
        MdcTabItemComponent,
        MdcTabPageComponent
    ]
})
export class MdcTabsModule { }
