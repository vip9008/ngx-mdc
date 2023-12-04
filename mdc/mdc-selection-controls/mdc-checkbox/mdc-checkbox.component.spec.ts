import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcCheckboxComponent } from './mdc-checkbox.component';

describe('MdcCheckboxComponent', () => {
  let component: MdcCheckboxComponent;
  let fixture: ComponentFixture<MdcCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
