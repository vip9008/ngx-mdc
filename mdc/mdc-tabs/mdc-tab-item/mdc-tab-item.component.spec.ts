import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcTabItemComponent } from './mdc-tab-item.component';

describe('MdcTabItemComponent', () => {
  let component: MdcTabItemComponent;
  let fixture: ComponentFixture<MdcTabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdcTabItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
