import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeDashboardComponent } from './mange-dashboard.component';

describe('MangeDashboardComponent', () => {
  let component: MangeDashboardComponent;
  let fixture: ComponentFixture<MangeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
