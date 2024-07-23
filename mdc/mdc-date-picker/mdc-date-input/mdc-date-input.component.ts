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

    public get availableYears(): number[] {
        let startingYear: number = this.startDate.getFullYear();
        let totalYears: number = this.endDate.getFullYear() - startingYear;
        let years: number[] = [];

        for (let i = 0; i < totalYears; i++) {
            years.push(startingYear + i);
        }

        return years;
    }

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

    private canChangeMonth(year: number, month: number): boolean {
        if ((year == this.startDate.getFullYear() && month < this.startDate.getMonth()) || (year == this.endDate.getFullYear() && month > this.endDate.getMonth())) {
            return false;
        } else {
            if (year < this.startDate.getFullYear() || year > this.endDate.getFullYear()) {
                return false;
            }
        }

        return true;
    }

    private changeMonth(month: number) {
        if (!this.canChangeMonth(this.currentMonth.getFullYear(), month)) {
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

    public checkIsSelected(day: number) {
        return this.selectedDate.getFullYear() == this.currentMonth.getFullYear()
            && this.selectedDate.getMonth() == this.currentMonth.getMonth()
            && this.selectedDate.getDate() == day;
    }

    public checkIsToday(day: number) {
        let today = new Date();

        return today.getFullYear() == this.currentMonth.getFullYear()
            && today.getMonth() == this.currentMonth.getMonth()
            && today.getDate() == day;
    }

    public changeYear(year: number) {
        if (year == this.currentMonth.getFullYear()) {
            return;
        }

        let month = this.currentMonth.getMonth();

        if (year == this.startDate.getFullYear() && month < this.startDate.getMonth()) {
            month = this.startDate.getMonth();
        }

        if (year == this.endDate.getFullYear() && month > this.endDate.getMonth()) {
            month = this.endDate.getMonth();
        }

        if (!this.canChangeMonth(year, month)) {
            return;
        }

        this.currentMonth = new Date(year, month, 1);
        this.getMonthData();
        this.pickerClasses['show-years'] = false;
    }

    public selectDate(day: number) {
        var newDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);

        if (newDate < this.startDate || newDate > this.endDate) {
            return;
        }

        this.selectedDate = newDate;
    }
}
