import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMapViewComponent } from './custom-map-view.component';

describe('CustomMapViewComponent', () => {
  let component: CustomMapViewComponent;
  let fixture: ComponentFixture<CustomMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomMapViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
