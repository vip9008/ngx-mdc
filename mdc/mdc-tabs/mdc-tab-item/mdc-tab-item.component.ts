import { Component, ContentChild, ElementRef, EventEmitter } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MdcTabPageComponent } from '../mdc-tab-page/mdc-tab-page.component';

@UntilDestroy()
@Component({
    selector: 'button[mdc-tab-item], a[mdc-tab-item]',
    templateUrl: './mdc-tab-item.component.html',
    styleUrl: './mdc-tab-item.component.scss',
    host: {
        'class': 'tab-item'
    }
})
export class MdcTabItemComponent {
    public activeState: EventEmitter<boolean> = new EventEmitter(false);
    
    @ContentChild(MdcTabPageComponent) tabPage: MdcTabPageComponent;

    constructor(private el: ElementRef) {
        this.activeState.pipe(untilDestroyed(this)).subscribe((active) => {
            if (active) {
                this.el.nativeElement.classList.add('active');
            } else {
                this.el.nativeElement.classList.remove('active');
            }
        });
    }

    public get element(): ElementRef {
        return this.el;
    }
}
