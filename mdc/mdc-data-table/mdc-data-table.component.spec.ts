import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcDataTableComponent } from './mdc-data-table.component';

describe('MdcDataTableComponent', () => {
  let component: MdcDataTableComponent;
  let fixture: ComponentFixture<MdcDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdcDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
