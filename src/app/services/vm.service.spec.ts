import {TestBed} from '@angular/core/testing';

import {VmService} from './vm.service';

describe('VmService', () => {
  let service: VmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
