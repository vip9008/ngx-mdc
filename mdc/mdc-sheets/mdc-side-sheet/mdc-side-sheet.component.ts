import { AfterContentInit, AfterViewInit, Component, effect, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MdcLayoutService } from '@ngx-mdc/mdc/mdc-layout/mdc-layout.service';

@Component({
    selector: 'mdc-side-sheet',
    templateUrl: './mdc-side-sheet.component.html',
    styleUrl: './mdc-side-sheet.component.scss'
})
export class MdcSideSheetComponent implements AfterViewInit, AfterContentInit {
    @Input() type: 'above-content' | 'coplanar' | 'modal' = 'above-content';
    
    @Output() sheetLoaded: EventEmitter<boolean> = new EventEmitter(false);
    @Output() sheetClosed: EventEmitter<boolean> = new EventEmitter(true);
    
    @ViewChild('sideSheet') sideSheet!: ElementRef;

    constructor(
        private layoutService: MdcLayoutService
    ) {
        effect(() => {
            const status = this.layoutService.layoutStatus;

            if (status.topAppBarVisible) {
                this.sideSheet.nativeElement.classList.add('app-bar-visible');
            } else {
                this.sideSheet.nativeElement.classList.remove('app-bar-visible');
            }
        });
    }

    ngAfterViewInit(): void {
        switch (this.type) {
            case 'coplanar': this.sideSheet.nativeElement.classList.add('fixed'); break;
            case 'modal': this.sideSheet.nativeElement.classList.add('modal'); break;
        }
    }
    
    ngAfterContentInit(): void {
        this.sheetLoaded.emit(true);
    }

    public openSheet() {
        this.sideSheet.nativeElement.classList.add('active');
        this.sheetClosed.emit(false);
    }

    public closeSheet() {
        this.sideSheet.nativeElement.classList.remove('active');
        this.sheetClosed.emit(true);
    }
}
