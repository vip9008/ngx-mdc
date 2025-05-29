import { Component, ElementRef, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizePipe } from '@pipes';

@Component({
    standalone: true,
    imports: [
        TranslateModule,
        CapitalizePipe
    ],
    selector: 'mdc-input-error',
    templateUrl: './input-error.component.html',
    styleUrls: ['./input-error.component.scss'],
    host: {
        'class': 'mdc-help-block'
    }
})
export class MdcInputErrorComponent {
    @Input() label: string | string;
    @Input() input: FormControl | AbstractControl;

    constructor(private el: ElementRef) {
    }

    get element(): ElementRef {
        return this.el;
    }
}
