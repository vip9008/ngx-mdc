import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTabsComponent } from './mdc-tabs.component';
import { MdcTabPageComponent } from './mdc-tab-page/mdc-tab-page.component';
import { MdcTabItemComponent } from './mdc-tab-item/mdc-tab-item.component';
import { MdcTabsGroupComponent } from './mdc-tabs-group/mdc-tabs-group.component';



@NgModule({
    declarations: [
        MdcTabsComponent,
        MdcTabsGroupComponent,
        MdcTabItemComponent,
        MdcTabPageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcTabsComponent,
        MdcTabsGroupComponent,
        MdcTabItemComponent,
        MdcTabPageComponent
    ]
})
export class MdcTabsModule { }
