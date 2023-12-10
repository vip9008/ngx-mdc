import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: 'mdc-host',
    standalone: true
})
export class MdcHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
