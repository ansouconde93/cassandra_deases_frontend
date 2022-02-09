import { TestBed } from '@angular/core/testing';

import { ManiocService } from './manioc.service';

describe('ManiocService', () => {
  let service: ManiocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManiocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
