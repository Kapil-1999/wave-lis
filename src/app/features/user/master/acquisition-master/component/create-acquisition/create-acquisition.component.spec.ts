import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcquisitionComponent } from './create-acquisition.component';

describe('CreateAcquisitionComponent', () => {
  let component: CreateAcquisitionComponent;
  let fixture: ComponentFixture<CreateAcquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAcquisitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
