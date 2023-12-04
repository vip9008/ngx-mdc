import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'mdc-icon, div[mdc-icon], span[mdc-icon], a[mdc-icon], button[mdc-icon]',
    templateUrl: './mdc-icon.component.html',
    styleUrls: ['./mdc-icon.component.scss']
})
export class MdcIconComponent implements AfterViewInit {
    @Input() size: 48 | 36 | 24 | 18 = 24;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        let iconSize = 'md-' + this.size.toString();
        this.el.nativeElement.classList.add('material-icon', iconSize);
    }
}
