import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVillageReportComponent } from './manage-village-report.component';

describe('ManageVillageReportComponent', () => {
  let component: ManageVillageReportComponent;
  let fixture: ComponentFixture<ManageVillageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVillageReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVillageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
