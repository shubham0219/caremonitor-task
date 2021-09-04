import { TestBed } from '@angular/core/testing';

import { CaremonitorService } from './caremonitor.service';

describe('CaremonitorService', () => {
  let service: CaremonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaremonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
