import { AfterViewInit, Component, ContentChild, ElementRef } from '@angular/core';
import { MdcTabItemComponent } from '../mdc-tab-item/mdc-tab-item.component';

@Component({
    standalone: false,
    selector: 'mdc-tab-page',
    templateUrl: './mdc-tab-page.component.html',
    styleUrl: './mdc-tab-page.component.scss',
    host: {
        'class': 'tab-page'
    }
})
export class MdcTabPageComponent {
    public index: number;

    constructor(private el: ElementRef) {
    }

    public get element(): ElementRef {
        return this.el;
    }
}
