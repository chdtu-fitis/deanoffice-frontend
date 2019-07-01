import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartmentComponent } from './update-department.component';

describe('UpdateDepartmentComponent', () => {
  let component: UpdateDepartmentComponent;
  let fixture: ComponentFixture<UpdateDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
