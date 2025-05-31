import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKhasraFarmerComponent } from './manage-khasra-farmer.component';

describe('ManageKhasraFarmerComponent', () => {
  let component: ManageKhasraFarmerComponent;
  let fixture: ComponentFixture<ManageKhasraFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageKhasraFarmerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageKhasraFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
