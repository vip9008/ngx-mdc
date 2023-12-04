import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcNavDrawerComponent } from './mdc-nav-drawer.component';

describe('MdcNavDrawerComponent', () => {
  let component: MdcNavDrawerComponent;
  let fixture: ComponentFixture<MdcNavDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcNavDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcNavDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
