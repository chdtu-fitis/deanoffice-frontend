import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryTeacherComponent } from './recovery-teacher.component';

describe('RecoveryTeacherComponent', () => {
  let component: RecoveryTeacherComponent;
  let fixture: ComponentFixture<RecoveryTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
