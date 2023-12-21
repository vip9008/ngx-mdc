import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewChild } from '@angular/core';
import { MdcTabPageComponent } from './mdc-tab-page/mdc-tab-page.component';
import { MdcTabItemComponent } from './mdc-tab-item/mdc-tab-item.component';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'mdc-tabs',
    templateUrl: './mdc-tabs.component.html',
    styleUrl: './mdc-tabs.component.scss'
})
export class MdcTabsComponent implements AfterViewInit {
    @Input() colorClass: string = 'indigo';
    @Input() tabsAlignment: 'full-width' | 'align-start' | 'align-end' = null;
    @Input() scrollableTabs: boolean = false;
    @Input() activeTab: number = null;

    @ViewChild('tabPages') tabPages!: ElementRef;
    @ViewChild('tabsIndicator') tabsIndicator!: ElementRef;
    @ContentChildren(MdcTabItemComponent) tabItems: QueryList<MdcTabItemComponent>;
    
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.el.nativeElement.classList.add('mdc-tabs-container');
    }

    ngAfterViewInit(): void {
        if (this.tabItems) {
            let hasPages: boolean = false;
            this.tabItems.forEach((item, index) => {
                if (item.tabPage) {
                    hasPages = true;
                    this.addTabPage(item.tabPage);
                }

                if (hasPages) {
                    this.tabPages.nativeElement.classList.remove('display-none');
                }

                fromEvent(item.element.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
                    this.activatePage(index);
                });
            });
        }
    }

    private addTabPage(tabPage: MdcTabPageComponent) {
        this.renderer.appendChild(this.tabPages.nativeElement, tabPage.element.nativeElement);
    }
    
    private get direction(): 'ltr' | 'rtl' {
        return getComputedStyle(this.el.nativeElement).direction.toLowerCase() as 'ltr' | 'rtl';
    }

    private activatePage(index: number) {
        if (this.activeTab != index && index < this.tabItems.length) {
            this.tabItems.get(this.activeTab)?.activeState?.emit(false);

            let tabItem: MdcTabItemComponent = this.tabItems.get(index);
            tabItem.activeState.emit(true);

            // update ink-bar
            // update tab-pages

            this.activeTab = index;
        }
    }
}
