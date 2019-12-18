import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedDocsListPageComponent } from './scanned-docs-list-page.component';

describe('ScannedDocsListPageComponent', () => {
  let component: ScannedDocsListPageComponent;
  let fixture: ComponentFixture<ScannedDocsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedDocsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedDocsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
