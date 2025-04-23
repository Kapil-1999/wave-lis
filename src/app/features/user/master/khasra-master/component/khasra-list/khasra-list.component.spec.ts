import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhasraListComponent } from './khasra-list.component';

describe('KhasraListComponent', () => {
  let component: KhasraListComponent;
  let fixture: ComponentFixture<KhasraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KhasraListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhasraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
