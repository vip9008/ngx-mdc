import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcListMetaComponent } from './mdc-list-meta.component';

describe('MdcListMetaComponent', () => {
  let component: MdcListMetaComponent;
  let fixture: ComponentFixture<MdcListMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcListMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcListMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
