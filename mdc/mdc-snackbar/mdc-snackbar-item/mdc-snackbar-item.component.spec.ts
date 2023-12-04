import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcSnackbarItemComponent } from './mdc-snackbar-item.component';

describe('MdcSnackbarItemComponent', () => {
  let component: MdcSnackbarItemComponent;
  let fixture: ComponentFixture<MdcSnackbarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcSnackbarItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcSnackbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
