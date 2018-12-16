import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFiltersComponent } from './students-filters.component';

describe('StudentsFiltersComponent', (): void => {
  let component: StudentsFiltersComponent;
  let fixture: ComponentFixture<StudentsFiltersComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentsFiltersComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
