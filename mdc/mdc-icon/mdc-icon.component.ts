import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'mdc-icon, div[mdc-icon], span[mdc-icon], a[mdc-icon], button[mdc-icon]',
    templateUrl: './mdc-icon.component.html',
    styleUrls: ['./mdc-icon.component.scss'],
    host: {
        'class': 'material-icon'
    }
})
export class MdcIconComponent implements AfterViewInit {
    @Input() iconVersion: 'MaterialIcons' | 'MaterialSymbols' = 'MaterialSymbols';
    @Input() iconStyle: 'normal' | 'outlined' | 'rounded' | 'sharp' | 'two-tone' = 'normal';
    @Input() iconSize: 48 | 36 | 24 | 18 = 24;
    @Input() biDirectional: boolean = false;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        let iconSize = 'md-' + this.iconSize.toString();
        this.el.nativeElement.classList.add(iconSize);

        let iconStyle = this.iconStyle == 'normal' ? null : this.iconStyle;

        if (this.iconVersion == 'MaterialSymbols') {
            this.el.nativeElement.classList.add('symbol');

            if (iconStyle == 'two-tone') {
                iconStyle = null;
            }
        }

        if (iconStyle !== null) {
            this.el.nativeElement.classList.add(iconStyle);
        }

        if (this.biDirectional) {
            this.el.nativeElement.classList.add('bi-directional');
        }
    }
}
