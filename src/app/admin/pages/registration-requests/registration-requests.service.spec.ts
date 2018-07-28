import { TestBed, inject } from '@angular/core/testing';

import { RegistrationRequestsService } from './registration-requests.service';

describe('RegistrationRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationRequestsService]
    });
  });

  it('should be created', inject([RegistrationRequestsService], (service: RegistrationRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
