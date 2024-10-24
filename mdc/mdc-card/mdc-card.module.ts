import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdcCardComponent } from './mdc-card.component';
import { CardActionDirective } from './card-action.directive';
import { MdcButtonModule } from '../mdc-button/mdc-button.module';

@NgModule({
    declarations: [
        MdcCardComponent,
        CardActionDirective
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        MdcCardComponent,
        CardActionDirective,
        MdcButtonModule
    ]
})
export class MdcCardModule { }
