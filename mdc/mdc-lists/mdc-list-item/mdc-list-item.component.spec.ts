import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcListItemComponent } from './mdc-list-item.component';

describe('MdcListItemComponent', () => {
  let component: MdcListItemComponent;
  let fixture: ComponentFixture<MdcListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
