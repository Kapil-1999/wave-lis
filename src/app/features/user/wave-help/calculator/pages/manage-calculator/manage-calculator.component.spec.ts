import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCalculatorComponent } from './manage-calculator.component';

describe('ManageCalculatorComponent', () => {
  let component: ManageCalculatorComponent;
  let fixture: ComponentFixture<ManageCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
