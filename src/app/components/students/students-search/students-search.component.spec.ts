import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsSearchComponent } from './students-search.component';

describe('StudentsSearchComponent', (): void => {
  let component: StudentsSearchComponent;
  let fixture: ComponentFixture<StudentsSearchComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentsSearchComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
