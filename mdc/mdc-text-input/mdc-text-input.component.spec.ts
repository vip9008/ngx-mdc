import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcTextInputComponent } from './mdc-text-input.component';

describe('MdcTextInputComponent', () => {
  let component: MdcTextInputComponent;
  let fixture: ComponentFixture<MdcTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcTextInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
