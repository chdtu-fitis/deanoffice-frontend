import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherComponent } from './add-teacher.component';

describe('AddTeacherComponent', () => {
  let component: AddTeacherComponent;
  let fixture: ComponentFixture<AddTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
