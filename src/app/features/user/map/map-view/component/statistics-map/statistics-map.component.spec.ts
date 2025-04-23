import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsMapComponent } from './statistics-map.component';

describe('StatisticsMapComponent', () => {
  let component: StatisticsMapComponent;
  let fixture: ComponentFixture<StatisticsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
