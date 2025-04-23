import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVillageComponent } from './manage-village.component';

describe('ManageVillageComponent', () => {
  let component: ManageVillageComponent;
  let fixture: ComponentFixture<ManageVillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVillageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
