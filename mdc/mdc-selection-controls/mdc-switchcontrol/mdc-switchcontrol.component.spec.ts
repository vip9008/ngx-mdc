import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcSwitchcontrolComponent } from './mdc-switchcontrol.component';

describe('MdcSwitchcontrolComponent', () => {
  let component: MdcSwitchcontrolComponent;
  let fixture: ComponentFixture<MdcSwitchcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcSwitchcontrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcSwitchcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
