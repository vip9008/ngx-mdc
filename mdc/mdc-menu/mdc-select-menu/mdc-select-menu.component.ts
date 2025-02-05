import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MdcMenuComponent } from '../mdc-menu.component';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    standalone: false,
    selector: 'mdc-select-menu',
    templateUrl: './mdc-select-menu.component.html',
    styleUrl: './mdc-select-menu.component.scss',
    host: {
        class: 'mdc-select-menu'
    }
})
export class MdcSelectMenuComponent implements AfterViewInit {
    @ViewChild(MdcMenuComponent) menuComponent: MdcMenuComponent;

    @Input() control: FormControl | AbstractControl;
    @Input() openDirection: 'top' | 'bottom' = 'top';
    @Input() staticLabel: boolean = false;
    @Input() appearance: 'default' | 'standard' | 'outlined' = 'default';
    @Input() label: string = '';
    @Input() disabled: boolean = false;

    ngAfterViewInit(): void {
        this.menuComponent.element.nativeElement.classList.add('select-menu');
    }
}
