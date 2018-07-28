import { TestBed, inject } from '@angular/core/testing';

import { CredResetService } from './cred-reset.service';

describe('CredResetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CredResetService]
    });
  });

  it('should be created', inject([CredResetService], (service: CredResetService) => {
    expect(service).toBeTruthy();
  }));
});
