import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcDialogContainerComponent } from './mdc-dialog-container.component';

describe('MdcDialogContainerComponent', () => {
  let component: MdcDialogContainerComponent;
  let fixture: ComponentFixture<MdcDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcDialogContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
