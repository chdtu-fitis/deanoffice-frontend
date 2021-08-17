import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisqualifiableCoursesTableComponent } from './disqualifiable-courses-table.component';

describe('DisqualifiableCoursesTableComponent', () => {
  let component: DisqualifiableCoursesTableComponent;
  let fixture: ComponentFixture<DisqualifiableCoursesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisqualifiableCoursesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisqualifiableCoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
