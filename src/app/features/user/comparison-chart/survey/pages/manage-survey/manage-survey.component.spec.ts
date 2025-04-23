import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSurveyComponent } from './manage-survey.component';

describe('ManageSurveyComponent', () => {
  let component: ManageSurveyComponent;
  let fixture: ComponentFixture<ManageSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
