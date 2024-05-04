import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage-services.service';

describe('StorageServicesService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
