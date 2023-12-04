import { Component, ContentChild, ElementRef, AfterViewInit } from '@angular/core';
import { MdcRadioDirective } from './mdc-radio.directive';

@Component({
    selector: 'mdc-radiobutton',
    templateUrl: './mdc-radiobutton.component.html',
    styleUrls: ['./mdc-radiobutton.component.scss']
})
export class MdcRadiobuttonComponent implements AfterViewInit {
    @ContentChild(MdcRadioDirective) radioInput: MdcRadioDirective;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-radiobutton');
    }
}
