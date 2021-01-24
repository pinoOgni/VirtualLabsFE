import {TestBed} from '@angular/core/testing';

import {VmModelsService} from './vm-models.service';

describe('VmModelsService', () => {
  let service: VmModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VmModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
