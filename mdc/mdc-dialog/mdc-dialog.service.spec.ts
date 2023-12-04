import { TestBed } from '@angular/core/testing';

import { MdcDialogService } from './mdc-dialog.service';

describe('MdcDialogService', () => {
  let service: MdcDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdcDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
