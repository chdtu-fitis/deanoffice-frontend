import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpelledStudentsComponent } from './expelled-students.component';

describe('ExpelledStudentsComponent', () => {
  let component: ExpelledStudentsComponent;
  let fixture: ComponentFixture<ExpelledStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ ExpelledStudentsComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpelledStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
