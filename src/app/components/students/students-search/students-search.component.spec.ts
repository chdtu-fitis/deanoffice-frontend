import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsSearchComponent } from './students-search.component';

describe('StudentsSearchComponent', () => {
  let component: StudentsSearchComponent;
  let fixture: ComponentFixture<StudentsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentsSearchComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
