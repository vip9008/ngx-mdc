import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'input-error',
    templateUrl: './input-error.component.html',
    styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements AfterViewInit {
    @Input() label: String | string;
    @Input() input: FormControl;

    constructor(private el: ElementRef) {
    }
    
    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('help-block');
    }

    get element(): ElementRef {
        return this.el;
    }
}
