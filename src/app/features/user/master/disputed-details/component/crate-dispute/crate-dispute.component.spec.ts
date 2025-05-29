import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateDisputeComponent } from './crate-dispute.component';

describe('CrateDisputeComponent', () => {
  let component: CrateDisputeComponent;
  let fixture: ComponentFixture<CrateDisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrateDisputeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrateDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
