import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewChild } from '@angular/core';
import { MdcTabPageComponent } from './mdc-tab-page/mdc-tab-page.component';
import { MdcTabItemComponent } from './mdc-tab-item/mdc-tab-item.component';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LayoutDirectionService } from '@services';

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
    @Input() aimateInkBar: boolean = true;

    @ViewChild('tabPages') tabPages!: ElementRef;
    @ViewChild('tabsContainer') tabsContainer!: ElementRef;
    @ViewChild('inkBar') inkBar!: ElementRef;
    @ContentChildren(MdcTabItemComponent) tabItems: QueryList<MdcTabItemComponent>;
    
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private directionService: LayoutDirectionService
    ) {
        this.el.nativeElement.classList.add('mdc-tabs-container');

        this.directionService.layoutDirection.subscribe((direction) => {
            this.updateInkBarPosition(this.tabItems.get(this.activeTab));
        });
    }

    ngAfterViewInit(): void {
        if (this.tabItems) {
            let hasPages: boolean = false;
            let pageIndex: number = 0;
            this.tabItems.forEach((item, index) => {
                if (item.tabPage) {
                    hasPages = true;
                    item.tabPage.index = pageIndex;
                    pageIndex++;
                    this.addTabPage(item.tabPage);
                }

                if (hasPages) {
                    this.tabPages.nativeElement.classList.remove('display-none');
                }

                fromEvent(item.element.nativeElement, 'click').pipe(untilDestroyed(this)).subscribe((event) => {
                    this.activatePage(index);
                });
            });

            this.activatePage(this.activeTab ?? 0);
        }
    }

    private addTabPage(tabPage: MdcTabPageComponent) {
        this.renderer.appendChild(this.tabPages.nativeElement, tabPage.element.nativeElement);
    }
    
    private get direction(): 'ltr' | 'rtl' {
        return getComputedStyle(this.el.nativeElement).direction.toLowerCase() as 'ltr' | 'rtl';
    }

    private updateInkBarPosition(tabItem: MdcTabItemComponent) {
        if (this.aimateInkBar) {
            this.tabsContainer.nativeElement.classList.add('animate');
        } else {
            this.tabsContainer.nativeElement.classList.remove('animate');
        }

        let containerOffset = this.tabsContainer.nativeElement.getBoundingClientRect();
        let tabOffset = tabItem.element.nativeElement.getBoundingClientRect();

        let inkBarPosition = {
            'width': `${tabOffset.width}px`,
            'left': this.direction == 'rtl' ? 'auto' : `${(tabOffset.left - containerOffset.left).toString()}px`,
            'right': this.direction == 'ltr' ? 'auto' : `${((containerOffset.left + containerOffset.width) - (tabOffset.left + tabOffset.width)).toString()}px`
        };

        Object.assign(this.inkBar.nativeElement.style, inkBarPosition);
    }

    private activatePage(index: number) {
        if (this.activeTab != index && index < this.tabItems.length) {
            this.tabItems.get(this.activeTab)?.activeState?.emit(false);

            let tabItem: MdcTabItemComponent = this.tabItems.get(index);
            tabItem.activeState.emit(true);

            this.updateInkBarPosition(tabItem);

            // update tab-pages
            let pagePosition = {
                'inset-inline-start': `-${(tabItem.tabPage.index * 100).toString()}%`,
                'inset-inline-end': 'auto'
            };

            this.tabItems.forEach((item) => {
                if (item.tabPage) {
                    Object.assign(item.tabPage.element.nativeElement.style, pagePosition);
                }
            });

            this.activeTab = index;
        }
    }
}
