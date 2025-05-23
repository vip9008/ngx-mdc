import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MdcMenuComponent } from '../mdc-menu.component';
import { AbstractControl, FormControl } from '@angular/forms';
import { find, cloneDeep, filter } from 'lodash-es';
import { MDCSelectOption } from './mdc-select-option.interface';

@Component({
    standalone: false,
    selector: 'mdc-select-menu',
    templateUrl: './mdc-select-menu.component.html',
    styleUrl: './mdc-select-menu.component.scss',
    host: {
        class: 'mdc-select-menu'
    }
})
export class MdcSelectMenuComponent implements OnInit, AfterViewInit {
    @ViewChild(MdcMenuComponent) menuComponent: MdcMenuComponent;

    @Input() control: FormControl | AbstractControl;
    @Input() openDirection: 'top' | 'bottom' = 'top';
    @Input() staticLabel: boolean = false;
    @Input() appearance: 'default' | 'standard' | 'outlined' = 'default';
    @Input() label: string = '';
    @Input() disabled: boolean = false;
    @Input() searchable: boolean = false;
    @Input() notFoundText: string;
    @Input() options: MDCSelectOption[] = [];

    public selectedLabel: string = '';
    public selectedValue: string | number | boolean;
    public filteredOptions: MDCSelectOption[] = [];

    private get formControl(): FormControl {
        return this.control as FormControl;
    }

    ngOnInit(): void {
        this.filteredOptions = cloneDeep(this.options);
    }

    ngAfterViewInit(): void {
        this.notFoundText = this.notFoundText?.length ? this.notFoundText : 'Can\'t find any item!';
        this.menuComponent.element.nativeElement.classList.add('select-menu');
        let selected = this.formControl?.value;
        if (selected && selected?.toString().length) {
            let selectedOption = find(this.options, (item) => item.value == selected);
            this.selectedLabel = selectedOption?.label;
            this.selectedValue = selectedOption?.value;
        }
    }

    public selectOption(option: {
        label: string,
        value: string | number | boolean,
    }) {
        this.selectedLabel = option?.label;
        this.selectedValue = option?.value;
        this.formControl?.setValue(this.selectedValue);
    }

    public searchOptions(event: Event) {
        let searchText: string = (event.target as HTMLInputElement)?.value;
        this.filteredOptions = this.filteredOptions = (!searchText || searchText.length == 0) ? cloneDeep(this.options) : filter(this.options, (option: MDCSelectOption) => {
            let labelMatch: boolean = false;

            if (option.searchData) {
                labelMatch = option.searchData?.toLowerCase().includes(searchText.toLowerCase());
            } else {
                labelMatch = option.label.toLowerCase().includes(searchText.toLowerCase());
            }

            let valueMatch = typeof option.value === 'string' && option.value.toLowerCase().includes(searchText.toLowerCase());
            return labelMatch || valueMatch;
        });
    }
}
