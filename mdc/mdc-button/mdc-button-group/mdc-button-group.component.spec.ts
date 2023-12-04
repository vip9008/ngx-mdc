import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcButtonGroupComponent } from './mdc-button-group.component';

describe('MdcButtonGroupComponent', () => {
  let component: MdcButtonGroupComponent;
  let fixture: ComponentFixture<MdcButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
