import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFileOfKhasraComponent } from './show-file-of-khasra.component';

describe('ShowFileOfKhasraComponent', () => {
  let component: ShowFileOfKhasraComponent;
  let fixture: ComponentFixture<ShowFileOfKhasraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowFileOfKhasraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFileOfKhasraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
