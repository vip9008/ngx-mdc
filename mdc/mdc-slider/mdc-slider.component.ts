import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, EventEmitter, ContentChild } from '@angular/core';
import { SliderInputDirective } from './slider-input.directive';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'mdc-slider',
    templateUrl: './mdc-slider.component.html',
    styleUrl: './mdc-slider.component.scss',
    host: {
        'class': 'mdc-slider'
    }
})
export class MdcSliderComponent implements AfterViewInit {
    @Input() discrete: boolean = false;

    @ContentChild(SliderInputDirective) sliderInput!: SliderInputDirective;
    @ViewChild('highlight') highlight!: ElementRef;

    private disabledState: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    private disabled: boolean = false;

    private get min(): number {
        if (!this.sliderInput.element.nativeElement.min) {
            return 0;
        }

        return Number(this.sliderInput.element.nativeElement.min);
    }

    private get max(): number {
        return Number(this.sliderInput.element.nativeElement.max);
    }

    private get step(): number {
        if (!this.sliderInput.element.nativeElement.step) {
            return 1;
        }

        return Number(this.sliderInput.element.nativeElement.step);
    }

    public get value(): number {
        if (!this.sliderInput.element.nativeElement.value) {
            return this.min;
        }

        return Number(this.sliderInput.element.nativeElement.value);
    }

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit(): void {
        if (this.discrete) {
            this.element.nativeElement.classList.add('discrete');
        }

        this.disabledState.pipe(untilDestroyed(this)).subscribe((isDisabled) => {
            this.disabled = isDisabled;

            if (isDisabled) {
                this.element.nativeElement.classList.add('disabled');
            } else {
                this.element.nativeElement.classList.remove('disabled');
            }
        });

        this.updateSlider();

        this.disabledState.emit(this.sliderInput.element.nativeElement.disabled as boolean);

        this.sliderInput.domChange.pipe(untilDestroyed(this)).subscribe((change: MutationRecord) => {
            if (change.type == 'attributes' && change.attributeName == 'disabled') {
                this.disabledState.emit(this.sliderInput.element.nativeElement.disabled as boolean);
            }
        });

        this.sliderInput.element.nativeElement.addEventListener('input', () => {
            if (!this.disabled) {
                this.updateSlider();
            }
        });
    }

    private updateSlider() {
        let percent: number = Math.min((this.value - this.min) / (this.max - this.min) * 100, 100);
        this.highlight.nativeElement.style.width = `${percent}%`;

        if (this.discrete) {
            let step: number = 100 / ((this.max - this.min) / this.step);
            let point: number = 100 / percent * step;

            this.renderer.setProperty(this.element.nativeElement, 'style', `--slider-point: ${step}%`);
            this.renderer.setStyle(this.highlight.nativeElement, 'background-size', `${point}% 0.125rem`);
        }
    }
}
