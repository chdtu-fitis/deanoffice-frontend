import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllInfoComponent } from './student-all-info.component';

describe('StudentAllInfoComponent', () => {
  let component: StudentAllInfoComponent;
  let fixture: ComponentFixture<StudentAllInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAllInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAllInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
