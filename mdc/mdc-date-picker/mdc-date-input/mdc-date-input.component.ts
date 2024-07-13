import { Component, Input } from '@angular/core';

@Component({
    selector: 'mdc-date-input',
    templateUrl: './mdc-date-input.component.html',
    styleUrl: './mdc-date-input.component.scss'
})
export class MdcDateInputComponent {
    @Input() startDate: Date = new Date((new Date()).getFullYear() - 100, (new Date()).getMonth(), 1);
    @Input() endDate: Date = new Date((new Date()).getFullYear() + 100, (new Date()).getMonth() + 1, 0);
    @Input() selectedDate: Date = new Date();
    @Input() dateFormat: string = 'dd/MM/yyyy';
    @Input() colorClass: string = 'purple-900';
    @Input() locale: string = 'en-US';

    public currentMonth: Date;

    public monthData: {
        startingDay: any[],
        monthDays: any[],
        nextMonthDays: any[];
    };

    public pickerClasses = {
        'show-years': false,
    };

    constructor() {
        this.currentMonth = this.selectedDate;
        this.pickerClasses[this.colorClass] = true;

        this.getMonthData();
    }

    private getMonthData() {
        let startingDay: number = (new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1)).getDay();
        let monthDays: number = (new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0)).getDate();
        let nextMonthDays: number = 42 - startingDay - monthDays;

        this.monthData = {
            startingDay: new Array(startingDay),
            monthDays: new Array(monthDays),
            nextMonthDays: new Array(nextMonthDays),
        };
    }

    private canChangeMonth(month: number): boolean {
        if ((this.currentMonth.getFullYear() == this.startDate.getFullYear() && month < this.startDate.getMonth()) || (this.currentMonth.getFullYear() == this.endDate.getFullYear() && month > this.endDate.getMonth())) {
            return false;
        } else {
            if (this.currentMonth.getFullYear() < this.startDate.getFullYear() || this.currentMonth.getFullYear() > this.endDate.getFullYear()) {
                return false;
            }
        }

        return true;
    }

    private changeMonth(month: number) {
        if (!this.canChangeMonth(month)) {
            return;
        }

        this.currentMonth = new Date(this.currentMonth.getFullYear(), month, 1);
        this.getMonthData();
    }

    public nextMonth() {
        this.changeMonth(this.currentMonth.getMonth() + 1);
    }

    public prevMonth() {
        this.changeMonth(this.currentMonth.getMonth() - 1);
    }

    public toggleYears() {
        this.pickerClasses['show-years'] = !this.pickerClasses['show-years'];
    }
}
