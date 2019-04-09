import { TestBed } from '@angular/core/testing';

import { DetailExportWarehouseService } from './detail-export-warehouse.service';

describe('DetailExportWarehouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailExportWarehouseService = TestBed.get(DetailExportWarehouseService);
    expect(service).toBeTruthy();
  });
});
