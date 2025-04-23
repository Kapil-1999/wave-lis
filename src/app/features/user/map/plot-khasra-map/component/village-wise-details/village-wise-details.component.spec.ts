import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageWiseDetailsComponent } from './village-wise-details.component';

describe('VillageWiseDetailsComponent', () => {
  let component: VillageWiseDetailsComponent;
  let fixture: ComponentFixture<VillageWiseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillageWiseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillageWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
