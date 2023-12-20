import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcTabsComponent } from './mdc-tabs.component';

describe('MdcTabsComponent', () => {
  let component: MdcTabsComponent;
  let fixture: ComponentFixture<MdcTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdcTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
