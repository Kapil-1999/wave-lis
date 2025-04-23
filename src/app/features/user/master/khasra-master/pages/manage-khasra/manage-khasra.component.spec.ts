import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKhasraComponent } from './manage-khasra.component';

describe('ManageKhasraComponent', () => {
  let component: ManageKhasraComponent;
  let fixture: ComponentFixture<ManageKhasraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageKhasraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageKhasraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
