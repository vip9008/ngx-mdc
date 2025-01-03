import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, EventEmitter, ContentChild } from '@angular/core';
import { SliderInputDirective } from './slider-input.directive';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControlName } from '@angular/forms';

@UntilDestroy()
@Component({
    standalone: false,
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
    @ContentChild(FormControlName) controlName: FormControlName;
    @ViewChild('highlight') highlight!: ElementRef;

    private disabledState: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    private disabled: boolean = false;

    private get sliderInputElement(): HTMLInputElement {
        return this.sliderInput.element.nativeElement;
    }

    private get min(): number {
        let value = this.sliderInputElement.min;

        if (!value) {
            return 0;
        }

        return Number(value);
    }

    private get max(): number {
        let value = this.sliderInputElement.max;
        return Number(value);
    }

    private get step(): number {
        let value = this.sliderInputElement.step;

        if (!value) {
            return 1;
        }

        return Number(value);
    }

    public get value(): number {
        let value = this.sliderInputElement.value;

        if (!value) {
            return this.min;
        }

        return Number(value);
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

        this.disabledState.emit(this.sliderInputElement.disabled as boolean);

        this.sliderInput.domChange.pipe(untilDestroyed(this)).subscribe((change: MutationRecord) => {
            if (change.type == 'attributes' && change.attributeName == 'disabled') {
                this.disabledState.emit(this.sliderInputElement.disabled as boolean);
            }
            if (['min', 'max', 'step', 'value'].includes(change.attributeName)) {
                this.updateSlider();
            }
        });

        this.sliderInputElement.addEventListener('input', () => {
            if (!this.disabled) {
                this.updateSlider();
            }
        });

        if (this.controlName) {
            this.controlName.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
                this.updateSlider();
            });
        }
    }

    private updateSlider() {
        let percent: number = Number(Math.min((this.value - this.min) / (this.max - this.min) * 100, 100).toFixed(2));
        this.renderer.setStyle(this.highlight.nativeElement, 'width', `${percent}%`);

        if (this.discrete) {
            let step: number = Number((100 / ((this.max - this.min) / this.step)).toFixed(3));
            let point: number = Number((100 / percent * step).toFixed(3));

            this.renderer.setProperty(this.element.nativeElement, 'style', `--slider-point: ${step}%`);
            this.renderer.setStyle(this.highlight.nativeElement, 'background-size', `${point}% 0.125rem`);
        }
    }
}
