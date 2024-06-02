import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcFabComponent } from './mdc-fab.component';

describe('MdcFabComponent', () => {
  let component: MdcFabComponent;
  let fixture: ComponentFixture<MdcFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdcFabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
