import { TestBed } from '@angular/core/testing';

import { HttpServiceServiceService } from './http-service-service.service';

describe('HttpServiceServiceService', () => {
  let service: HttpServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
