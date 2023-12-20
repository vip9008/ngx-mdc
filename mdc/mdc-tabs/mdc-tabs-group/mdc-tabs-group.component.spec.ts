import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcTabsGroupComponent } from './mdc-tabs-group.component';

describe('MdcTabsGroupComponent', () => {
  let component: MdcTabsGroupComponent;
  let fixture: ComponentFixture<MdcTabsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdcTabsGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcTabsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
