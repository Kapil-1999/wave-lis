import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDisputedComponent } from './manage-disputed.component';

describe('ManageDisputedComponent', () => {
  let component: ManageDisputedComponent;
  let fixture: ComponentFixture<ManageDisputedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDisputedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDisputedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
