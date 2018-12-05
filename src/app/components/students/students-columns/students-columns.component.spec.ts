import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsColumnsComponent } from './students-columns.component';

describe('StudentsColumnsComponent', () => {
  let component: StudentsColumnsComponent;
  let fixture: ComponentFixture<StudentsColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentsColumnsComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
