import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcSideSheetComponent } from './mdc-side-sheet.component';

describe('MdcSideSheetComponent', () => {
  let component: MdcSideSheetComponent;
  let fixture: ComponentFixture<MdcSideSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdcSideSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcSideSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
