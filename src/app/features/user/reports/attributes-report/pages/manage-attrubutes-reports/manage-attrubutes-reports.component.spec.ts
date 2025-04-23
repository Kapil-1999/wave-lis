import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttrubutesReportsComponent } from './manage-attrubutes-reports.component';

describe('ManageAttrubutesReportsComponent', () => {
  let component: ManageAttrubutesReportsComponent;
  let fixture: ComponentFixture<ManageAttrubutesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAttrubutesReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAttrubutesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
