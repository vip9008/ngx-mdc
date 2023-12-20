import { AfterViewInit, Component, ContentChild, ElementRef } from '@angular/core';
import { MdcTabItemComponent } from '../mdc-tab-item/mdc-tab-item.component';

@Component({
    selector: 'mdc-tab-page',
    templateUrl: './mdc-tab-page.component.html',
    styleUrl: './mdc-tab-page.component.scss'
})
export class MdcTabPageComponent implements AfterViewInit {
    @ContentChild(MdcTabItemComponent) tabItem!: MdcTabItemComponent;

    constructor(private el: ElementRef) {
        this.el.nativeElement.classList.add('tab-page');
    }

    ngAfterViewInit(): void {
        if (!this.tabItem) {
            throw new Error(`Missing @ContentChild(MdcTabItemComponent) in MdcTabPageComponent`);
        }
    }
}
