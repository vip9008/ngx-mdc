import { AfterViewInit, Component, ContentChild, ElementRef, SimpleChanges } from '@angular/core';
import { MdcCheckDirective } from './mdc-check.directive';

@Component({
    selector: 'mdc-checkbox',
    templateUrl: './mdc-checkbox.component.html',
    styleUrls: ['./mdc-checkbox.component.scss']
})
export class MdcCheckboxComponent implements AfterViewInit {
    @ContentChild(MdcCheckDirective) checkboxInput: MdcCheckDirective;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-checkbox');
    }
}
