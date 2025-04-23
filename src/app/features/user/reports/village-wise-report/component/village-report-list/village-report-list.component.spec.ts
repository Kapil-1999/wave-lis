import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageReportListComponent } from './village-report-list.component';

describe('VillageReportListComponent', () => {
  let component: VillageReportListComponent;
  let fixture: ComponentFixture<VillageReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillageReportListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillageReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
