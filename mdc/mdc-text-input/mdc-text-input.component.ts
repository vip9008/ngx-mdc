import { Component, ElementRef, Input, AfterViewInit, ContentChild, ViewChild, AfterContentInit } from '@angular/core';
import { TextInputDirective } from './text-input.directive';
import { AbstractControl, FormControl, FormControlName } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    standalone: false,
    selector: 'mdc-text-field, mdc-text-area',
    templateUrl: './mdc-text-input.component.html',
    styleUrls: ['./mdc-text-input.component.scss']
})
export class MdcTextInputComponent implements AfterContentInit, AfterViewInit {
    @ContentChild(TextInputDirective) textInput: TextInputDirective;
    @ContentChild(FormControlName) controlName: FormControlName;
    @ViewChild('outlineTopDiv') outlineTopDiv: ElementRef;
    @ViewChild('labelTag') labelTag: ElementRef;

    @Input() control: FormControl | AbstractControl;
    @Input() staticLabel: boolean = false;
    @Input() appearance: 'default' | 'standard' | 'outlined' = 'default';
    @Input() label: string = '';
    @Input() disabled: boolean = false;

    public fileInput: boolean = false;
    public inputValue = '';

    public get formControl(): FormControl | AbstractControl {
        if (this.control) {
            return this.control;
        }

        return this.controlName?.control;
    }

    private get baseSize(): number {
        let baseSize = getComputedStyle(this.el.nativeElement).getPropertyValue('font-size');
        return Number(baseSize.match(/\d+/)[0]);
    }

    public get hasError(): boolean {
        return this.formControl?.invalid && (this.formControl?.touched || this.formControl?.dirty);
    }

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        let tagName: string = this.el.nativeElement.tagName.toLowerCase();

        if (tagName == 'mdc-text-field') {
            this.el.nativeElement.classList.add('mdc-text-field');
        } else if (tagName == 'mdc-text-area') {
            this.el.nativeElement.classList.add('mdc-text-area');
        }

        if (this.appearance != 'default') {
            this.el.nativeElement.classList.add(this.appearance);
        }

        if (this.appearance == 'outlined' && this.labelTag.nativeElement.offsetWidth) {
            let labelWidth = Math.ceil(this.labelTag.nativeElement.offsetWidth * 0.75) / this.baseSize + 0.125;
            this.outlineTopDiv.nativeElement.style.width = 'calc(100% - ' + (labelWidth + 0.5) + 'rem)';
        }
    }

    ngAfterContentInit(): void {
        this.textInput.element.nativeElement.onfocus = () => {
            this.el.nativeElement.classList.add('active');
        }
        this.textInput.element.nativeElement.onblur = () => {
            this.el.nativeElement.classList.remove('active');
            this.onBlur();
        }
        this.textInput.element.nativeElement.onChange = () => {
            this.onBlur();
        }

        if (this.controlName) {
            this.controlName.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
                this.onBlur();
            });
        }

        if (this.disabled) {
            if (this.controlName) {
                this.formControl?.disable();
            } else {
                this.textInput.element.nativeElement.disabled = true;
            }
        }

        this.textInput.domChange.pipe(untilDestroyed(this)).subscribe((change: MutationRecord) => {
            if (change.type == 'attributes' && change.attributeName == 'disabled') {
                this.disabled = this.textInput.element.nativeElement.disabled as boolean;
                this.onBlur();
            }
        });

        if (this.textInput?.element?.nativeElement?.attributes?.type?.nodeValue?.toLowerCase() == 'file') {
            this.fileInput = true;
        }

        this.onBlur();
    }

    private onBlur(): void {
        this.inputValue = this.textInput.element.nativeElement.value;

        if (this.staticLabel || this.inputValue?.length) {
            this.el.nativeElement.classList.add('focus');
        } else {
            this.el.nativeElement.classList.remove('focus');
        }

        if (this.hasError) {
            this.el.nativeElement.classList.add('has-error');
        } else {
            this.el.nativeElement.classList.remove('has-error');
        }
    }

    public setValue(value: any) {
        if (!this.disabled) {
            if (this.formControl) {
                this.formControl?.setValue(value);
            } else {
                this.textInput.element.nativeElement.value = value;
            }
            this.onBlur();
        }
    }
}
