import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKhasraComponent } from './create-khasra.component';

describe('CreateKhasraComponent', () => {
  let component: CreateKhasraComponent;
  let fixture: ComponentFixture<CreateKhasraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateKhasraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKhasraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
