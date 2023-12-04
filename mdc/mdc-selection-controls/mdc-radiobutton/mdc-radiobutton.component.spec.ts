import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcRadiobuttonComponent } from './mdc-radiobutton.component';

describe('MdcRadiobuttonComponent', () => {
  let component: MdcRadiobuttonComponent;
  let fixture: ComponentFixture<MdcRadiobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcRadiobuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
