import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsolidatedComponent } from './manage-consolidated.component';

describe('ManageConsolidatedComponent', () => {
  let component: ManageConsolidatedComponent;
  let fixture: ComponentFixture<ManageConsolidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsolidatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
