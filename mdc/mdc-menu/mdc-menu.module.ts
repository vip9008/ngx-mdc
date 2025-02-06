import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcMenuComponent } from './mdc-menu.component';
import { MdcListsModule } from '../mdc-lists/mdc-lists.module';
import { MdcMenuButtonDirective } from './mdc-menu-button.directive';
import { MdcMenuContainerDirective } from './mdc-menu-container.directive';
import { MdcMenuCloseDirective } from './mdc-menu-close.directive';
import { MdcSelectMenuComponent } from './mdc-select-menu/mdc-select-menu.component';
import { MdcTextInputModule } from '../mdc-text-input/mdc-text-input.module';
import { MdcCommonModule } from '../mdc-common/mdc-common.module';

@NgModule({
    declarations: [
        MdcMenuComponent,
        MdcMenuButtonDirective,
        MdcMenuContainerDirective,
        MdcMenuCloseDirective,
        MdcSelectMenuComponent
    ],
    imports: [
        CommonModule,
        MdcCommonModule,
        MdcTextInputModule,
        MdcListsModule
    ],
    exports: [
        MdcListsModule,
        MdcMenuComponent,
        MdcMenuButtonDirective,
        MdcMenuContainerDirective,
        MdcMenuCloseDirective,
        MdcSelectMenuComponent
    ]
})
export class MdcMenuModule {
}
