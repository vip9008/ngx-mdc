import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcLayoutComponent } from './mdc-layout.component';

describe('MdcLayoutComponent', () => {
  let component: MdcLayoutComponent;
  let fixture: ComponentFixture<MdcLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdcLayoutComponent]
    });
    fixture = TestBed.createComponent(MdcLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
