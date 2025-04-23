import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhasraPlotMapComponent } from './khasra-plot-map.component';

describe('KhasraPlotMapComponent', () => {
  let component: KhasraPlotMapComponent;
  let fixture: ComponentFixture<KhasraPlotMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KhasraPlotMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhasraPlotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
