import { Component, ElementRef, Input, AfterViewInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'nav[id="mdc-nav-drawer"]',
    templateUrl: './mdc-nav-drawer.component.html',
    styleUrls: ['./mdc-nav-drawer.component.scss']
})
export class MdcNavDrawerComponent implements AfterViewInit {
    @Input() type: 'permanent' | 'persistent' | 'modal' = 'permanent';
    @Input() clipped: boolean = false;

    public active: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add(this.type);

        if (this.clipped && this.type != 'modal') {
            this.el.nativeElement.classList.add('clipped');
        }

        this.active.pipe(untilDestroyed(this)).subscribe((status) => {
            if (status) {
                this.el.nativeElement.classList.add('active');
            } else {
                this.el.nativeElement.classList.remove('active');
            }
        });
    }
}
