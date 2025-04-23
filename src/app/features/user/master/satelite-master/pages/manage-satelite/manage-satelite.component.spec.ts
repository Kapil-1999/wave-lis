import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSateliteComponent } from './manage-satelite.component';

describe('ManageSateliteComponent', () => {
  let component: ManageSateliteComponent;
  let fixture: ComponentFixture<ManageSateliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSateliteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSateliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
