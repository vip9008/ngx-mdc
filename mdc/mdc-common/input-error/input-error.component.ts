import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizePipe } from '@pipes';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        CapitalizePipe
    ],
    selector: 'mdc-input-error',
    templateUrl: './input-error.component.html',
    styleUrls: ['./input-error.component.scss']
})
export class MdcInputErrorComponent implements AfterViewInit {
    @Input() label: String | string;
    @Input() input: FormControl | AbstractControl;

    constructor(private el: ElementRef) {
    }
    
    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('help-block');
    }

    get element(): ElementRef {
        return this.el;
    }
}
