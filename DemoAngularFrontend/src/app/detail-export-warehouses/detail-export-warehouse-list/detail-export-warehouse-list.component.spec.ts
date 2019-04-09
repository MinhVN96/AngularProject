import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExportWarehouseListComponent } from './detail-export-warehouse-list.component';

describe('DetailExportWarehouseListComponent', () => {
  let component: DetailExportWarehouseListComponent;
  let fixture: ComponentFixture<DetailExportWarehouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailExportWarehouseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExportWarehouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
