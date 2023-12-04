import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'mdc-progress-indicator',
    templateUrl: './mdc-progress-indicator.component.html',
    styleUrls: ['./mdc-progress-indicator.component.scss']
})
export class MdcProgressIndicatorComponent implements AfterViewInit {
    @Input() progress: number = null;
    @Input() buffer: number = null;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-progress-track');
        if (this.progress !== null && this.buffer !== null) {
            this.el.nativeElement.classList.add('buffer');
        }
    }

    private constrainPercentage(percent: number) {
        let x = percent < 0 ? 0 : percent;
        x = percent > 100 ? 100 : percent;

        return x;
    }

    get buffered(): String {
        let percent = this.constrainPercentage(this.buffer);

        return percent.toString() + '%';
    }

    get buffering(): String {
        let percent = this.constrainPercentage(this.buffer);
        percent = 100 - percent;

        return percent.toString() + '%';
    }

    get progressed(): String {
        let percent = this.constrainPercentage(this.progress);

        if (this.buffer !== null) {
            let buffer = this.constrainPercentage(this.buffer);
            percent = percent > buffer ? buffer : percent;
        }

        return percent.toString() + '%';
    }
}
