import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcIconComponent } from './mdc-icon.component';

describe('MdcIconComponent', () => {
  let component: MdcIconComponent;
  let fixture: ComponentFixture<MdcIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
