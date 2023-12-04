import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcMenuComponent } from './mdc-menu.component';

describe('MdcMenuComponent', () => {
  let component: MdcMenuComponent;
  let fixture: ComponentFixture<MdcMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
