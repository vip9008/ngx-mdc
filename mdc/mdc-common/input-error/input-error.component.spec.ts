import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcInputErrorComponent } from './input-error.component';

describe('MdcInputErrorComponent', () => {
  let component: MdcInputErrorComponent;
  let fixture: ComponentFixture<MdcInputErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcInputErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
