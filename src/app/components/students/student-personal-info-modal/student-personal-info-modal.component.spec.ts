import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPersonalInfoModalComponent } from './student-personal-info-modal.component';

describe('StudentPersonalInfoModalComponent', () => {
  let component: StudentPersonalInfoModalComponent;
  let fixture: ComponentFixture<StudentPersonalInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPersonalInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPersonalInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
