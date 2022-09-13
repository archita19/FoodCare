import { TestBed } from '@angular/core/testing';

import { TestSensorService } from './test-sensor.service';

describe('TestSensorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestSensorService = TestBed.get(TestSensorService);
    expect(service).toBeTruthy();
  });
});
