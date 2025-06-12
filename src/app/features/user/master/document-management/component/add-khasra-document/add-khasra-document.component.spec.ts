import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKhasraDocumentComponent } from './add-khasra-document.component';

describe('AddKhasraDocumentComponent', () => {
  let component: AddKhasraDocumentComponent;
  let fixture: ComponentFixture<AddKhasraDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKhasraDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKhasraDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
