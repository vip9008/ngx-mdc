import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcProgressSpinnerComponent } from './mdc-progress-spinner.component';

describe('MdcProgressSpinnerComponent', () => {
  let component: MdcProgressSpinnerComponent;
  let fixture: ComponentFixture<MdcProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcProgressSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
