import { Component, AfterViewInit, Input, ElementRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-progress-indicator',
    templateUrl: './mdc-progress-indicator.component.html',
    styleUrls: ['./mdc-progress-indicator.component.scss'],
    host: {
        'class': 'mdc-progress-track'
    }
})
export class MdcProgressIndicatorComponent implements AfterViewInit, OnChanges {
    @Input() progress: number = null;
    @Input() buffer: number = null;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.checkBufferState();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.checkBufferState();
    }

    private checkBufferState() {
        if (this.progress !== null && this.buffer !== null) {
            this.el.nativeElement.classList.add('buffer');
        } else {
            this.el.nativeElement.classList.remove('buffer');
        }
    }

    private constrainPercentage(percent: number) {
        let x = percent < 0 ? 0 : percent;
        x = percent > 100 ? 100 : percent;

        return x;
    }

    get buffered(): string {
        let percent = this.constrainPercentage(this.buffer);

        return percent.toString() + '%';
    }

    get buffering(): string {
        let percent = this.constrainPercentage(this.buffer);
        percent = 100 - percent;

        return percent.toString() + '%';
    }

    get progressed(): string {
        let percent = this.constrainPercentage(this.progress);

        if (this.buffer !== null) {
            let buffer = this.constrainPercentage(this.buffer);
            percent = percent > buffer ? buffer : percent;
        }

        return percent.toString() + '%';
    }
}
