import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlotKhasraComponent } from './manage-plot-khasra.component';

describe('ManagePlotKhasraComponent', () => {
  let component: ManagePlotKhasraComponent;
  let fixture: ComponentFixture<ManagePlotKhasraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePlotKhasraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePlotKhasraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
