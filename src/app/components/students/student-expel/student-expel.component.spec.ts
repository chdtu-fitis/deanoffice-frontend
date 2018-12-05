import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExpelComponent } from './student-expel.component';

describe('StudentExpelComponent', () => {
  let component: StudentExpelComponent;
  let fixture: ComponentFixture<StudentExpelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentExpelComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExpelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
