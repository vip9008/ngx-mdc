import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewChild } from '@angular/core';
import { MdcTabItemComponent } from '../mdc-tab-item/mdc-tab-item.component';

@Component({
    selector: 'mdc-tabs-group',
    templateUrl: './mdc-tabs-group.component.html',
    styleUrl: './mdc-tabs-group.component.scss'
})
export class MdcTabsGroupComponent implements AfterViewInit {
    @Input() colorClass: string = 'indigo';
    @Input() tabsAlignment: 'full-width' | 'align-start' | 'align-end' = null;
    @Input() scrollableTabs: boolean = false;
    
    @ViewChild('tabsGroup') tabsGroup!: ElementRef;
    @ViewChild('tabsIndicator') tabsIndicator!: ElementRef;
    
    @ContentChildren(MdcTabItemComponent) tabItems: QueryList<MdcTabItemComponent>;
    
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.el.nativeElement.classList.add('mdc-tabs-group');
    }

    ngAfterViewInit(): void {
        if (this.tabsAlignment) {
            this.el.nativeElement.classList.add(this.tabsAlignment);
        }
        if (this.scrollableTabs) {
            this.el.nativeElement.classList.add('scrollable');
        }
    }

    public addTabItem(tabItem: MdcTabItemComponent) {
        this.renderer.insertBefore(this.tabsGroup.nativeElement, tabItem.element.nativeElement, this.tabsIndicator.nativeElement);
    }
}
