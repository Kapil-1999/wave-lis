import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKhataComponent } from './manage-khata.component';

describe('ManageKhataComponent', () => {
  let component: ManageKhataComponent;
  let fixture: ComponentFixture<ManageKhataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageKhataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageKhataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
