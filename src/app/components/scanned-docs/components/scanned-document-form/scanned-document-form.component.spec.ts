import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedDocumentFormComponent } from './scanned-document-form.component';

describe('ScannedDocumentFormComponent', () => {
  let component: ScannedDocumentFormComponent;
  let fixture: ComponentFixture<ScannedDocumentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedDocumentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
