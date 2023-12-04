import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcDividerComponent } from './mdc-divider.component';

describe('MdcDividerComponent', () => {
  let component: MdcDividerComponent;
  let fixture: ComponentFixture<MdcDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
