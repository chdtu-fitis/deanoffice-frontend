import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeRunnerComponent } from './grade-runner.component';

describe('GradeRunnerComponent', () => {
  let component: GradeRunnerComponent;
  let fixture: ComponentFixture<GradeRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
