import { TestBed } from '@angular/core/testing';

import { ResendmessageService } from './resendmessage.service';

describe('ResendmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResendmessageService = TestBed.get(ResendmessageService);
    expect(service).toBeTruthy();
  });
});
