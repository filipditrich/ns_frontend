import { TestBed, inject } from '@angular/core/testing';

import { RegistrationRequestService } from './registration-request.service';

describe('RegistrationRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationRequestService]
    });
  });

  it('should be created', inject([RegistrationRequestService], (service: RegistrationRequestService) => {
    expect(service).toBeTruthy();
  }));
});
