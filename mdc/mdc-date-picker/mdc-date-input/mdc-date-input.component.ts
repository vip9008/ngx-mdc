import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { MdcTextInputComponent } from '../../mdc-text-input/mdc-text-input.component';
import { DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'mdc-date-input',
    templateUrl: './mdc-date-input.component.html',
    styleUrl: './mdc-date-input.component.scss',
    providers: [
        DatePipe,
    ],
})
export class MdcDateInputComponent implements AfterContentInit {
    @ContentChild(MdcTextInputComponent) input?: MdcTextInputComponent;
    @ViewChild('mdcCalendar') calendar!: ElementRef;

    @Input() startDate: Date = new Date((new Date()).getFullYear() - 100, (new Date()).getMonth(), 1);
    @Input() endDate: Date = new Date((new Date()).getFullYear() + 100, (new Date()).getMonth() + 1, 0);
    @Input() selectedDate: Date = new Date();
    @Input() dateFormat: string = 'yyyy-MM-dd';
    @Input() locale: string = 'en-US';
    @Input() okButton: string = 'Ok';
    @Input() cancelButton: string = 'Cancel';

    @Output() dateValue: EventEmitter<Date> = new EventEmitter<Date>(null);

    private _weekDays = {
        'en-US': ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        'ar-BH': ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    }

    public get weekDays(): string[] {
        if (!this._weekDays[this.locale]) {
            return this._weekDays['en-US'];
        }

        return this._weekDays[this.locale];
    }

    public currentMonth: Date;

    public monthData: {
        startingDay: any[],
        monthDays: any[],
        nextMonthDays: any[];
    };

    public showYears: boolean = false;

    public get availableYears(): number[] {
        let startingYear: number = this.startDate.getFullYear();
        let totalYears: number = this.endDate.getFullYear() - startingYear;
        let years: number[] = [];

        for (let i = 0; i < totalYears; i++) {
            years.push(startingYear + i);
        }

        return years;
    }

    public get label(): string {
        return this.input?.label || 'Date';
    }

    private activeCalendar: boolean = false;
    private isInline: boolean = false;

    @HostListener('window:resize', ['$event'])
    @HostListener('window:scroll', ['$event'])
    private closeEvent(event) {
        if (this.activeCalendar) {
            this.closeCalendar();
        }
    }

    private get baseSize(): number {
        let baseSize = getComputedStyle(this.el.nativeElement).getPropertyValue('font-size');
        return Number(baseSize.match(/\d+/)[0]);
    }

    private get direction(): 'ltr' | 'rtl' {
        return getComputedStyle(this.el.nativeElement).direction.toLowerCase() as 'ltr' | 'rtl';
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private el: ElementRef,
        private datePipe: DatePipe
    ) {
        this.currentMonth = this.selectedDate;

        this.getMonthData();
    }

    ngAfterContentInit(): void {
        if (this.input) {
            this.input.textInput.element.nativeElement.onfocus = () => {
                this.openCalendar();
                this.input.textInput.element.nativeElement.blur();
            }
        }
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

    public checkIsSelected(day: number) {
        return this.selectedDate?.getFullYear() == this.currentMonth.getFullYear()
            && this.selectedDate?.getMonth() == this.currentMonth.getMonth()
            && this.selectedDate?.getDate() == day;
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
        this.showYears = false;
    }

    public selectDate(day: number) {
        var newDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);

        if (newDate < this.startDate || newDate > this.endDate) {
            return;
        }

        this.selectedDate = newDate;
        if (this.isInline) {
            this.confirmDate();
        }
    }

    public confirmDate() {
        this.input?.setValue(this.datePipe.transform(this.selectedDate, this.dateFormat));
        this.dateValue.emit(this.selectedDate);
        this.closeCalendar();
    }

    private updateDomStatus(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.activeCalendar) {
                this.calendar.nativeElement.classList.add('active');
            } else {
                this.calendar.nativeElement.classList.remove('active');
            }
        }
    }

    public closeCalendar(): void {
        if (!this.activeCalendar) {
            return;
        }

        this.activeCalendar = false;
        this.updateDomStatus();
    }

    public openCalendar(): void {
        if (this.activeCalendar) {
            return;
        }

        this.activeCalendar = true;
        this.updateDomStatus();

        if (isPlatformBrowser(this.platformId)) {
            let baseSize = this.baseSize;
            this.calendar.nativeElement.removeAttribute('style');

            let viewportWidth = document.documentElement.clientWidth || document.body.clientWidth;
            let viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;
            
            if (viewportWidth >= 960) {
                this.isInline = true;

                let calHeight = 284;
                let calWidth = 256;
                let calPosition = this.el.nativeElement.getBoundingClientRect();

                let position: any = {
                    "top": "auto",
                    "right": "auto",
                    "bottom": "auto",
                    "left": "auto",
                    "position": "fixed"
                };
    
                if ((calPosition.top + calHeight) > viewportHeight) {
                    position.bottom = (1 * baseSize).toString() + 'px';
                } else {
                    position.top = calPosition.top.toString() + 'px';
                }

                let direction = this.direction;
    
                if (direction == 'ltr') {
                    position.left = calPosition.left.toString() + 'px';
                    position.right = "auto";

                    if ((calPosition.left + calWidth) > viewportWidth) {
                        position.right = (1 * baseSize).toString() + 'px';
                        position.left = "auto";
                    }
                } else {
                    position.right = (viewportWidth - calPosition.right).toString() + 'px';
                    position.left = "auto";

                    if ((calPosition.right - calWidth) < 0) {
                        position.left = (1 * baseSize).toString() + 'px';
                        position.right = "auto";
                    }
                }

                Object.assign(this.calendar.nativeElement.style, position);
            } else {
                this.isInline = false;
            }
        }
    }
}
