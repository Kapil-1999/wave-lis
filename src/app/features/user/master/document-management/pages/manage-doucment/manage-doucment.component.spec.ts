import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDoucmentComponent } from './manage-doucment.component';

describe('ManageDoucmentComponent', () => {
  let component: ManageDoucmentComponent;
  let fixture: ComponentFixture<ManageDoucmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDoucmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDoucmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
