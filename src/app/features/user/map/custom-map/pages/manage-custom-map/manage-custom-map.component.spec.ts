import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomMapComponent } from './manage-custom-map.component';

describe('ManageCustomMapComponent', () => {
  let component: ManageCustomMapComponent;
  let fixture: ComponentFixture<ManageCustomMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCustomMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCustomMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
