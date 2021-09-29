import { TestBed } from '@angular/core/testing';

import { MiinterceptorService } from './miinterceptor.service';

describe('MiinterceptorService', () => {
  let service: MiinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
