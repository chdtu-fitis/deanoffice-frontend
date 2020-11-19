import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredStudentsComponent } from './registered-students.component';

describe('RegisteredStudentsComponent', () => {
  let component: RegisteredStudentsComponent;
  let fixture: ComponentFixture<RegisteredStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
