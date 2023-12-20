import { Component, ElementRef, EventEmitter } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'button[mdc-tab-item], a[mdc-tab-item]',
    templateUrl: './mdc-tab-item.component.html',
    styleUrl: './mdc-tab-item.component.scss'
})
export class MdcTabItemComponent {
    public activeState: EventEmitter<boolean> = new EventEmitter(false);

    constructor(private el: ElementRef) {
        this.el.nativeElement.classList.add('tab-item');

        this.activeState.pipe(untilDestroyed(this)).subscribe((active) => {
            if (active) {
                this.el.nativeElement.classList.add('active');
            } else {
                this.el.nativeElement.classList.remove('active');
            }
        });

        fromEvent(this.el.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
            this.activeState.emit(true);
        });
    }

    public get element(): ElementRef {
        return this.el;
    }
}
