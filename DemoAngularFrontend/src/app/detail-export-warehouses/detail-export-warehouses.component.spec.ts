import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExportWarehousesComponent } from './detail-export-warehouses.component';

describe('DetailExportWarehousesComponent', () => {
  let component: DetailExportWarehousesComponent;
  let fixture: ComponentFixture<DetailExportWarehousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailExportWarehousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExportWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
