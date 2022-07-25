import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveCoursesStatisticsComponent } from './selective-courses-statistics.component';

describe('StudentsStatisticsOfSelectiveCoursesComponent', () => {
  let component: SelectiveCoursesStatisticsComponent;
  let fixture: ComponentFixture<SelectiveCoursesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiveCoursesStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveCoursesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
