import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhasraOnMapComponent } from './khasra-on-map.component';

describe('KhasraOnMapComponent', () => {
  let component: KhasraOnMapComponent;
  let fixture: ComponentFixture<KhasraOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KhasraOnMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhasraOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
