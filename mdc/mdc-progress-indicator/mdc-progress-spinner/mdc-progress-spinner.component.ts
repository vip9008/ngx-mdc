import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-progress-spinner',
    templateUrl: './mdc-progress-spinner.component.html',
    styleUrls: ['./mdc-progress-spinner.component.scss'],
    host: {
        'class': 'mdc-progress-wrapper'
    }
})
export class MdcProgressSpinnerComponent implements AfterViewInit {
    @Input() active: boolean = true;
    @Input() mini: boolean = false;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        if (this.active) {
            this.el.nativeElement.classList.add('active');
        }

        if (this.mini) {
            this.el.nativeElement.classList.add('mini');
        }
    }
}
