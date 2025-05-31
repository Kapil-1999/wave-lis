import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKhasraFarmerComponent } from './create-khasra-farmer.component';

describe('CreateKhasraFarmerComponent', () => {
  let component: CreateKhasraFarmerComponent;
  let fixture: ComponentFixture<CreateKhasraFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateKhasraFarmerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKhasraFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
