import { Component, ContentChild, Input } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { TextInputDirective } from '@ngx-mdc/mdc/mdc-text-input/text-input.directive';

@Component({
    selector: 'mdc-date-input',
    templateUrl: './mdc-date-input.component.html',
    styleUrl: './mdc-date-input.component.scss'
})
export class MdcDateInputComponent {
    @Input() startDate: Date = new Date((new Date()).getFullYear() - 100, (new Date()).getMonth(), 1);
    @Input() endDate: Date = new Date((new Date()).getFullYear() + 100, (new Date()).getMonth() + 1, 0);
    @Input() selectedDate: Date = new Date();
    @Input() currentMonth: Date = new Date();
    @Input() dateFormat: string = 'dd/MM/yyyy';
    @Input() colorClass: string = 'purple-900';
}
