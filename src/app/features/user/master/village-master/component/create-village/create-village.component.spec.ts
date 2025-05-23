import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVillageComponent } from './create-village.component';

describe('CreateVillageComponent', () => {
  let component: CreateVillageComponent;
  let fixture: ComponentFixture<CreateVillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateVillageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
