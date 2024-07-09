import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcDateInputComponent } from './mdc-date-input.component';

describe('MdcDateInputComponent', () => {
  let component: MdcDateInputComponent;
  let fixture: ComponentFixture<MdcDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdcDateInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
