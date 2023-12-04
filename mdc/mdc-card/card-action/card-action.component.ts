import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-card-action',
    templateUrl: './card-action.component.html',
    styleUrls: ['./card-action.component.scss']
})
export class CardActionComponent implements OnInit {
    @Input() type: 'none' | 'button' | 'link' = 'none';
    @Input() click: any = null;
    @Input() href: any = null;
    @Input() routerLink: any = null;

    constructor() { }

    ngOnInit(): void {
    }
}
