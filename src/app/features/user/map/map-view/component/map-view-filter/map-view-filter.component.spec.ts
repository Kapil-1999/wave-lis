import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewFilterComponent } from './map-view-filter.component';

describe('MapViewFilterComponent', () => {
  let component: MapViewFilterComponent;
  let fixture: ComponentFixture<MapViewFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapViewFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapViewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
