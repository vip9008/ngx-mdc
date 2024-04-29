import { TestBed } from '@angular/core/testing';

import { MdcSheetsService } from './mdc-sheets.service';

describe('MdcSheetsService', () => {
  let service: MdcSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdcSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
