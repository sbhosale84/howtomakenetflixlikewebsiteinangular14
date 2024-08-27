import { TestBed } from '@angular/core/testing';

import { TvSeriesApiService } from './tv-series-api.service';

describe('TvSeriesApiService', () => {
  let service: TvSeriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvSeriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
