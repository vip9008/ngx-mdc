import { AfterContentInit, ContentChild, Directive, ElementRef } from '@angular/core';
import { MdcFabLabelDirective } from './mdc-fab-label.directive';
import { MdcIconElementDirective } from '@ngx-mdc/mdc/mdc-common/mdc-icon-element.directive';

@Directive({
    selector: '[mdc-fab-button]',
    host: {
        'class': 'mdc-fab-button'
    }
})
export class MdcFabButtonDirective implements AfterContentInit {
    @ContentChild(MdcIconElementDirective) fabIcon: MdcIconElementDirective;
    @ContentChild(MdcFabLabelDirective) fabLabel: MdcFabLabelDirective;
    
    constructor(
        private el: ElementRef
    ) {
    }

    ngAfterContentInit(): void {
        if (!this.fabIcon && !this.fabLabel) {
            throw new Error(`Missing both @ContentChild(MdcIconElementDirective) && @ContentChild(MdcFabLabelDirective) declaration in MdcFabButtonDirective`);
        }
    }

    public get element(): ElementRef {
        return this.el;
    }
}
