import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMapViewComponent } from './manage-map-view.component';

describe('ManageMapViewComponent', () => {
  let component: ManageMapViewComponent;
  let fixture: ComponentFixture<ManageMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageMapViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
