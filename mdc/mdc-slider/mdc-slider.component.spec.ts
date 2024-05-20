import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcSliderComponent } from './mdc-slider.component';

describe('MdcSliderComponent', () => {
  let component: MdcSliderComponent;
  let fixture: ComponentFixture<MdcSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdcSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
