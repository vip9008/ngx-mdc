import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import { MdcFabButtonDirective } from './mdc-fab-button.directive';

@Component({
    standalone: false,
    selector: 'mdc-fab',
    templateUrl: './mdc-fab.component.html',
    styleUrl: './mdc-fab.component.scss',
    host: {
        'class': 'mdc-fab'
    }
})
export class MdcFabComponent implements AfterContentInit {
    @Input() type: 'regular' | 'mini' | 'extended' = 'regular';

    @ContentChild(MdcFabButtonDirective) fabButton!: MdcFabButtonDirective;

    ngAfterContentInit(): void {
        if (!this.fabButton) {
            throw new Error(`Missing @ContentChild(MdcFabButtonDirective) declaration in MdcFabComponent`);
        }

        if (this.type == 'extended' && !this.fabButton.fabLabel) {
            throw new Error(`Missing @ContentChild(MdcFabLabelDirective) declaration in MdcFabButtonDirective`);
        }

        this.fabButton.element.nativeElement.classList.remove('mini', 'extended');

        if (this.type != 'regular') {
            this.fabButton.element.nativeElement.classList.add(this.type);
        }
    }
}
