import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdcCardComponent } from './mdc-card.component';
import { CardActionComponent } from './card-action/card-action.component';

@NgModule({
    declarations: [
        MdcCardComponent,
        CardActionComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        MdcCardComponent,
        CardActionComponent
    ]
})
export class MdcCardModule { }
