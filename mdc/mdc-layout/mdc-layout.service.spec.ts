import { TestBed } from '@angular/core/testing';

import { MdcLayoutService } from './mdc-layout.service';

describe('MdcLayoutService', () => {
  let service: MdcLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdcLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
