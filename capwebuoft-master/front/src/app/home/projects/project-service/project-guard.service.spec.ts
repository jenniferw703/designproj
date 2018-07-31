import { TestBed, inject } from '@angular/core/testing';

import { ProjectGuardService } from './project-guard.service';

describe('ProjectGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectGuardService]
    });
  });

  it('should be created', inject([ProjectGuardService], (service: ProjectGuardService) => {
    expect(service).toBeTruthy();
  }));
});
