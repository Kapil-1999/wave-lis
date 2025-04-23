import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesReportListComponent } from './attributes-report-list.component';

describe('AttributesReportListComponent', () => {
  let component: AttributesReportListComponent;
  let fixture: ComponentFixture<AttributesReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributesReportListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributesReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
