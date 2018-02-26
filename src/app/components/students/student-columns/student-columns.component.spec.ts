import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentColumnsComponent } from './student-columns.component';

describe('StudentColumnsComponent', () => {
  let component: StudentColumnsComponent;
  let fixture: ComponentFixture<StudentColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
