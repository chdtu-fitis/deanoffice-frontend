import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsListComponent } from './students-list.component';

describe('StudentsListComponent', (): void => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentsListComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
