import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-list-meta',
    templateUrl: './mdc-list-meta.component.html',
    styleUrls: ['./mdc-list-meta.component.scss'],
    host: {
        'class': 'meta'
    }
})
export class MdcListMetaComponent implements AfterViewInit {
    @Input() icon: boolean = false;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        if (this.icon) {
            this.el.nativeElement.classList.add('icon');
        }
    }
}
