import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcCardComponent } from './mdc-card.component';

describe('MdcCardComponent', () => {
    let component: MdcCardComponent;
    let fixture: ComponentFixture<MdcCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MdcCardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MdcCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
