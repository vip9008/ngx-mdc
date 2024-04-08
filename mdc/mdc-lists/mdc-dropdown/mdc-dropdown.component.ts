import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'mdc-dropdown',
    templateUrl: './mdc-dropdown.component.html',
    styleUrl: './mdc-dropdown.component.scss'
})
export class MdcDropdownComponent implements OnInit {
    @Input() isOpen: boolean = false;
    @Input() activeColor: string = '';

    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        this.el.nativeElement.classList.add('mdc-list-group');

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
