import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlotComponent } from './manage-plot.component';

describe('ManagePlotComponent', () => {
  let component: ManagePlotComponent;
  let fixture: ComponentFixture<ManagePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
