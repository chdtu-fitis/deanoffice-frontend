import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFiltersComponent } from './students-filters.component';

describe('StudentsFiltersComponent', () => {
  let component: StudentsFiltersComponent;
  let fixture: ComponentFixture<StudentsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentsFiltersComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
