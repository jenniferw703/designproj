import { TestBed, inject } from '@angular/core/testing';

import { TeamGuardService } from './team-guard.service';

describe('TeamGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamGuardService]
    });
  });

  it('should be created', inject([TeamGuardService], (service: TeamGuardService) => {
    expect(service).toBeTruthy();
  }));
});
