import { TestBed } from '@angular/core/testing';

import { RadioBasesService } from './radio-bases.service';

describe('RadioBasesService', () => {
  let service: RadioBasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadioBasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
