import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCouresTableComponent } from './student-coures-table.component';

describe('StudentCouresTableComponent', () => {
  let component: StudentCouresTableComponent;
  let fixture: ComponentFixture<StudentCouresTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCouresTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCouresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
