import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedDocumentsListComponent } from './scanned-documents-list.component';

describe('ScannedDocumentsListComponent', () => {
  let component: ScannedDocumentsListComponent;
  let fixture: ComponentFixture<ScannedDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
