import { AfterViewInit, Component, ContentChild, ElementRef } from '@angular/core';
import { MdcSwitchDirective } from './mdc-switch.directive';

@Component({
    selector: 'mdc-switchcontrol',
    templateUrl: './mdc-switchcontrol.component.html',
    styleUrls: ['./mdc-switchcontrol.component.scss']
})
export class MdcSwitchcontrolComponent implements AfterViewInit {
    @ContentChild(MdcSwitchDirective) switchInput: MdcSwitchDirective;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.el.nativeElement.classList.add('mdc-switch');
    }
}
