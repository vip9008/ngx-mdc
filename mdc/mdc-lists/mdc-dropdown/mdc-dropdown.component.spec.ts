import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcDropdownComponent } from './mdc-dropdown.component';

describe('MdcDropdownComponent', () => {
  let component: MdcDropdownComponent;
  let fixture: ComponentFixture<MdcDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdcDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
