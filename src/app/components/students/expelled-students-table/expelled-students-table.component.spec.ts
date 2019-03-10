import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpelledStudentsTableComponent } from './expelled-students-table.component';

describe('ExpelledStudentsTableComponent', () => {
  let component: ExpelledStudentsTableComponent;
  let fixture: ComponentFixture<ExpelledStudentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpelledStudentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpelledStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
