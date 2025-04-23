import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSateliteImageComponent } from './upload-satelite-image.component';

describe('UploadSateliteImageComponent', () => {
  let component: UploadSateliteImageComponent;
  let fixture: ComponentFixture<UploadSateliteImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadSateliteImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSateliteImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
