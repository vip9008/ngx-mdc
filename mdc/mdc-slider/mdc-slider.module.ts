import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcSliderComponent } from './mdc-slider.component';
import { SliderInputDirective } from './slider-input.directive';

@NgModule({
    declarations: [
        MdcSliderComponent,
        SliderInputDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MdcSliderComponent,
        SliderInputDirective
    ]
})
export class MdcSliderModule {
}
