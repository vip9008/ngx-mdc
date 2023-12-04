import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcButtonComponent } from './mdc-button.component';

describe('MdcButtonComponent', () => {
  let component: MdcButtonComponent;
  let fixture: ComponentFixture<MdcButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
