import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcListItemComponent } from './mdc-list-item/mdc-list-item.component';
import { MdcListGraphicComponent } from './mdc-list-graphic/mdc-list-graphic.component';
import { MdcListMetaComponent } from './mdc-list-meta/mdc-list-meta.component';
import { MdcIconModule } from '../mdc-icon/mdc-icon.module';
import { MdcListContainerDirective } from './mdc-list-container.directive';
import { MdcListTextDirective } from './mdc-list-text.directive';
import { MdcListGroupDirective } from './mdc-list-group.directive';

@NgModule({
    declarations: [
        MdcListContainerDirective,
        MdcListGroupDirective,
        MdcListItemComponent,
        MdcListGraphicComponent,
        MdcListTextDirective,
        MdcListMetaComponent,
        MdcListGroupDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcIconModule,
        MdcListContainerDirective,
        MdcListGroupDirective,
        MdcListItemComponent,
        MdcListGraphicComponent,
        MdcListTextDirective,
        MdcListMetaComponent
    ]
})
export class MdcListsModule { }
