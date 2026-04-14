import { Component, Input, ElementRef } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-progress-spinner',
    templateUrl: './mdc-progress-spinner.component.html',
    styleUrls: ['./mdc-progress-spinner.component.scss'],
    host: {
        '[class.mdc-progress-wrapper]': 'progress === null',
        '[class.mdc-determinate-wrapper]': 'progress !== null',
        '[class.active]': 'active',
        '[class.mini]': 'mini',
    }
})
export class MdcProgressSpinnerComponent {
    @Input() progress: number = null;
    @Input() active: boolean = true;
    @Input() mini: boolean = false;
    @Input() showPercentage: boolean = false;

    constructor(private el: ElementRef) {
    }

    private constrainPercentage(percent: number): number {
        if (isNaN(percent)) {
            return 0;
        }

        let x = percent < 0 ? 0 : percent;
        x = percent > 100 ? 100 : percent;

        return x;
    }

    public get progressed(): string {
        let percent = this.constrainPercentage(this.progress);

        return percent.toFixed(0);
    }
}
