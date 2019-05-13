import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStudentsToGroupComponent } from './assign-students-to-group.component';

describe('AssignStudentsToGroupComponent', () => {
  let component: AssignStudentsToGroupComponent;
  let fixture: ComponentFixture<AssignStudentsToGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignStudentsToGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignStudentsToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
