import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFamerComponent } from './manage-famer.component';

describe('ManageFamerComponent', () => {
  let component: ManageFamerComponent;
  let fixture: ComponentFixture<ManageFamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFamerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
