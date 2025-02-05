import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcSelectMenuComponent } from './mdc-select-menu.component';

describe('MdcSelectMenuComponent', () => {
  let component: MdcSelectMenuComponent;
  let fixture: ComponentFixture<MdcSelectMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdcSelectMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdcSelectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
