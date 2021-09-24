import { TestBed } from '@angular/core/testing';

import { AlumnoserviceService } from './alumnoservice.service';

describe('AlumnoserviceService', () => {
  let service: AlumnoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
