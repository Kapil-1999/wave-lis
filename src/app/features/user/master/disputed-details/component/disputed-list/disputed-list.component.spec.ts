import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputedListComponent } from './disputed-list.component';

describe('DisputedListComponent', () => {
  let component: DisputedListComponent;
  let fixture: ComponentFixture<DisputedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisputedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisputedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
