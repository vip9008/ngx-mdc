import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'mdc-divider',
    templateUrl: './mdc-divider.component.html',
    styleUrls: ['./mdc-divider.component.scss'],
    host: {
        'class': 'mdc-divider'
    }
})
export class MdcDividerComponent implements AfterViewInit {
    @Input() inset: boolean = false;
    @Input() margin: 56 | 100 | null = null;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        if (this.inset) {
            this.el.nativeElement.classList.add('inset');
            
            if (this.margin !== null) {
                let margin = 'md-' + this.margin.toString();
                this.el.nativeElement.classList.add(margin);
            }
        }
    }
}
