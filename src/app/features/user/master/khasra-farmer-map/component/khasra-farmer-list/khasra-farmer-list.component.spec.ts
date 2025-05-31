import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhasraFarmerListComponent } from './khasra-farmer-list.component';

describe('KhasraFarmerListComponent', () => {
  let component: KhasraFarmerListComponent;
  let fixture: ComponentFixture<KhasraFarmerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KhasraFarmerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhasraFarmerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
