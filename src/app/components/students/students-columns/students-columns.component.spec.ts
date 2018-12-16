import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsColumnsComponent } from './students-columns.component';

describe('StudentsColumnsComponent', (): void => {
  let component: StudentsColumnsComponent;
  let fixture: ComponentFixture<StudentsColumnsComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentsColumnsComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentsColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
