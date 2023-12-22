import { AfterViewInit, Component, ContentChild, ElementRef } from '@angular/core';
import { MdcTabItemComponent } from '../mdc-tab-item/mdc-tab-item.component';

@Component({
    selector: 'mdc-tab-page',
    templateUrl: './mdc-tab-page.component.html',
    styleUrl: './mdc-tab-page.component.scss'
})
export class MdcTabPageComponent {
    public index: number;

    constructor(private el: ElementRef) {
        this.el.nativeElement.classList.add('tab-page');
    }

    public get element(): ElementRef {
        return this.el;
    }
}
