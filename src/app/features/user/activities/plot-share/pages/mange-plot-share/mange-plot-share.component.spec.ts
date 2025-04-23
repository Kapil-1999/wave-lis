import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangePlotShareComponent } from './mange-plot-share.component';

describe('MangePlotShareComponent', () => {
  let component: MangePlotShareComponent;
  let fixture: ComponentFixture<MangePlotShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangePlotShareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangePlotShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
