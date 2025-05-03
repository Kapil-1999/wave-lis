import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWeatherComponent } from './manage-weather.component';

describe('ManageWeatherComponent', () => {
  let component: ManageWeatherComponent;
  let fixture: ComponentFixture<ManageWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageWeatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
