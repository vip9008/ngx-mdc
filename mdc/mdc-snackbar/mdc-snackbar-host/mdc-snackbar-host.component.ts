import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { SnackbarInstance } from '../snackbar-message.interface';

@Component({
    standalone: false,
    selector: 'mdc-snackbar-host',
    templateUrl: './mdc-snackbar-host.component.html',
    styleUrls: ['./mdc-snackbar-host.component.scss'],
    host: {
        'class': 'mdc-snackbar',
        '[class.active]': 'instance?.visible'
    }
})
export class MdcSnackbarHostComponent implements AfterViewInit, OnChanges {
    @Input() instance!: SnackbarInstance;
    @Input() defaultActionColor: string = 'accent-color';

    @Output() dismiss = new EventEmitter<void>();

    @ViewChild('dynamicHost', { read: ViewContainerRef })
    private dynamicHost!: ViewContainerRef;

    private dynamicCreated = false;

    ngAfterViewInit(): void {
        this.renderDynamicComponent();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['instance'] && this.dynamicHost) {
            this.renderDynamicComponent(true);
        }
    }

    public onDismiss(): void {
        this.dismiss.emit();
    }

    private renderDynamicComponent(forceRecreate: boolean = false): void {
        if (!this.instance || this.instance.request.kind !== 'component' || !this.dynamicHost) {
            return;
        }

        if (this.dynamicCreated && !forceRecreate) {
            return;
        }

        this.dynamicHost.clear();

        const config = this.instance.request.componentConfig;
        const componentRef = this.dynamicHost.createComponent(config?.component as Type<unknown>);

        const mergedInputs = {
            ...(config?.inputs ?? {}),
            visible: this.instance.visible,
            dismiss: () => this.onDismiss()
        };

        Object.entries(mergedInputs).forEach(([key, value]) => {
            componentRef.setInput(key, value);
        });

        this.dynamicCreated = true;
    }
}