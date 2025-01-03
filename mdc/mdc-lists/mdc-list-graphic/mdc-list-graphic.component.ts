import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-list-graphic',
    templateUrl: './mdc-list-graphic.component.html',
    styleUrls: ['./mdc-list-graphic.component.scss']
})
export class MdcListGraphicComponent implements AfterViewInit {
    @Input() type: 'graphic' | 'icon' = 'icon';
    @Input() size: 40 | 56 | 100 = 40;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add(this.type);

        if (this.type == 'graphic') {
            let size = 'md-' + this.size.toString();
            this.el.nativeElement.classList.add(size);
        }
    }
}
