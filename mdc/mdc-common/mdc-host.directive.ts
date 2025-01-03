import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: 'mdc-host',
})
export class MdcHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
