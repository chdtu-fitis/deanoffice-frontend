import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStudentsToGroupComponent } from './assign-students-to-group.component';

describe('AssignStudentsToGroupComponent', (): void => {
  let component: AssignStudentsToGroupComponent;
  let fixture: ComponentFixture<AssignStudentsToGroupComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ AssignStudentsToGroupComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(AssignStudentsToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
