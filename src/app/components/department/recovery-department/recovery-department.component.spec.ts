import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryDepartmentComponent } from './recovery-department.component';

describe('RecoveryDepartmentComponent', () => {
  let component: RecoveryDepartmentComponent;
  let fixture: ComponentFixture<RecoveryDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
