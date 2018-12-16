import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExpelComponent } from './student-expel.component';

describe('StudentExpelComponent', (): void => {
  let component: StudentExpelComponent;
  let fixture: ComponentFixture<StudentExpelComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentExpelComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentExpelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
