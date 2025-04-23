import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedListComponent } from './consolidated-list.component';

describe('ConsolidatedListComponent', () => {
  let component: ConsolidatedListComponent;
  let fixture: ComponentFixture<ConsolidatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsolidatedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
