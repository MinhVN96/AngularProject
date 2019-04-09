import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExportWarehouseComponent } from './detail-export-warehouse.component';

describe('DetailExportWarehouseComponent', () => {
  let component: DetailExportWarehouseComponent;
  let fixture: ComponentFixture<DetailExportWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailExportWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExportWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
