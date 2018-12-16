import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpelledStudentsComponent } from './expelled-students.component';

describe('ExpelledStudentsComponent', (): void => {
  let component: ExpelledStudentsComponent;
  let fixture: ComponentFixture<ExpelledStudentsComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ ExpelledStudentsComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(ExpelledStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
