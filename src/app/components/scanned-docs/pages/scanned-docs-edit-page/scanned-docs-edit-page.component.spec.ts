import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedDocsEditPageComponent } from './scanned-docs-edit-page.component';

describe('ScannedDocsEditPageComponent', () => {
  let component: ScannedDocsEditPageComponent;
  let fixture: ComponentFixture<ScannedDocsEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedDocsEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedDocsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
