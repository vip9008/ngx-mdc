import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcSnackbarHostComponent } from './mdc-snackbar-item.component';

describe('MdcSnackbarHostComponent', () => {
  let component: MdcSnackbarHostComponent;
  let fixture: ComponentFixture<MdcSnackbarHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcSnackbarHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcSnackbarHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
