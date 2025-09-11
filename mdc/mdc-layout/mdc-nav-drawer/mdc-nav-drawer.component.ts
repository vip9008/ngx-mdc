import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter } from 'rxjs';

@UntilDestroy()
@Component({
    standalone: false,
    selector: 'nav[id="mdc-nav-drawer"]',
    templateUrl: './mdc-nav-drawer.component.html',
    styleUrls: ['./mdc-nav-drawer.component.scss']
})
export class MdcNavDrawerComponent implements AfterViewInit {
    @Input() type: 'permanent' | 'persistent' | 'modal' = 'permanent';
    @Input() clipped: boolean = false;

    public active: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private el: ElementRef,
        private router: Router
    ) {
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

        this.router.events.pipe(
            filter(e => e instanceof NavigationStart),
            untilDestroyed(this)
        ).subscribe(() => {
            if (this.active.value) {
                this.active.next(false);
            }
        });
    }
}
