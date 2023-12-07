import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'mdc-icon, div[mdc-icon], span[mdc-icon], a[mdc-icon], button[mdc-icon]',
    templateUrl: './mdc-icon.component.html',
    styleUrls: ['./mdc-icon.component.scss']
})
export class MdcIconComponent implements AfterViewInit {
    @Input() iconStyle: 'normal' | 'outlined' = 'normal';
    @Input() iconSize: 48 | 36 | 24 | 18 = 24;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        let iconSize = 'md-' + this.iconSize.toString();
        this.el.nativeElement.classList.add('material-icon', iconSize);
        if (this.iconStyle == 'outlined') {
            this.el.nativeElement.classList.add('outlined');
        }
    }
}
