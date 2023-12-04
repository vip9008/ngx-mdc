import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcProgressIndicatorComponent } from './mdc-progress-indicator.component';

describe('MdcProgressIndicatorComponent', () => {
  let component: MdcProgressIndicatorComponent;
  let fixture: ComponentFixture<MdcProgressIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcProgressIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
