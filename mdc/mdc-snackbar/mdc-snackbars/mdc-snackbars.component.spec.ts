import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcSnackbarsComponent } from './mdc-snackbars.component';

describe('MdcSnackbarsComponent', () => {
  let component: MdcSnackbarsComponent;
  let fixture: ComponentFixture<MdcSnackbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcSnackbarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcSnackbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
