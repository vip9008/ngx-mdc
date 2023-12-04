import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcListGraphicComponent } from './mdc-list-graphic.component';

describe('MdcListGraphicComponent', () => {
  let component: MdcListGraphicComponent;
  let fixture: ComponentFixture<MdcListGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcListGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcListGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
