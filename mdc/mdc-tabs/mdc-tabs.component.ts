import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewChild } from '@angular/core';
import { MdcTabPageComponent } from './mdc-tab-page/mdc-tab-page.component';
import { MdcTabsGroupComponent } from './mdc-tabs-group/mdc-tabs-group.component';

@Component({
    selector: 'mdc-tabs',
    templateUrl: './mdc-tabs.component.html',
    styleUrl: './mdc-tabs.component.scss'
})
export class MdcTabsComponent implements AfterViewInit {
    @Input() colorClass: string = 'indigo';
    @Input() tabsAlignment: 'full-width' | 'align-start' | 'align-end' = null;
    @Input() scrollableTabs: boolean = false;

    @ViewChild(MdcTabsGroupComponent) tabsGroup!: MdcTabsGroupComponent;
    @ContentChildren(MdcTabPageComponent) tabPages: QueryList<MdcTabPageComponent>;
    
    constructor(private el: ElementRef) {
        this.el.nativeElement.classList.add('mdc-tabs-container');
    }

    ngAfterViewInit(): void {
        if (this.tabPages) {
            this.tabPages.forEach((page) => {
                this.tabsGroup.addTabItem(page.tabItem);
            });
        }

        console.log(this.tabPages);
        console.log(this.tabsGroup);
    }
}
