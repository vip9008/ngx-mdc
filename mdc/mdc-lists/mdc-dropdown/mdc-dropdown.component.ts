import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    standalone: false,
    selector: 'mdc-dropdown',
    templateUrl: './mdc-dropdown.component.html',
    styleUrl: './mdc-dropdown.component.scss',
    host: {
        'class': 'mdc-list-group'
    }
})
export class MdcDropdownComponent implements OnInit {
    @Input() isOpen: boolean = false;
    @Input() activeColor: string = '';

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        if (this.isOpen) {
            this.el.nativeElement.classList.add('expanded');
        } else {
            this.el.nativeElement.classList.add('collapsed');
        }
    }

    public toggleDropdown() {
        this.el.nativeElement.classList.add(this.isOpen ? 'collapsed' : 'expanded');
        this.el.nativeElement.classList.remove(this.isOpen ? 'expanded' : 'collapsed');

        this.isOpen = !this.isOpen;
    }
}
