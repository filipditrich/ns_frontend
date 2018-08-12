import { TestBed, inject } from '@angular/core/testing';

import { MatchManagerService } from './match-manager.service';

describe('MatchManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchManagerService]
    });
  });

  it('should be created', inject([MatchManagerService], (service: MatchManagerService) => {
    expect(service).toBeTruthy();
  }));
});
