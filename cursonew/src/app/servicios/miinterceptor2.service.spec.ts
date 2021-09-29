import { TestBed } from '@angular/core/testing';

import { Miinterceptor2Service } from './miinterceptor2.service';

describe('Miinterceptor2Service', () => {
  let service: Miinterceptor2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Miinterceptor2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
