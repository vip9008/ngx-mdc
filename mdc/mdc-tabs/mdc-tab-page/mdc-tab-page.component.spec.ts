import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcTabPageComponent } from './mdc-tab-page.component';

describe('MdcTabPageComponent', () => {
  let component: MdcTabPageComponent;
  let fixture: ComponentFixture<MdcTabPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdcTabPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcTabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
