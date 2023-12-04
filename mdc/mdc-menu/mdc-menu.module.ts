import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcMenuComponent } from './mdc-menu.component';
import { MdcListsModule } from '../mdc-lists/mdc-lists.module';
import { MdcMenuButtonDirective } from './mdc-menu-button.directive';
import { MdcMenuContainerDirective } from './mdc-menu-container.directive';
import { MdcMenuCloseDirective } from './mdc-menu-close.directive';

@NgModule({
    declarations: [
        MdcMenuComponent,
        MdcMenuButtonDirective,
        MdcMenuContainerDirective,
        MdcMenuCloseDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcListsModule,
        MdcMenuComponent,
        MdcMenuButtonDirective,
        MdcMenuContainerDirective,
        MdcMenuCloseDirective
    ]
})
export class MdcMenuModule {
}
