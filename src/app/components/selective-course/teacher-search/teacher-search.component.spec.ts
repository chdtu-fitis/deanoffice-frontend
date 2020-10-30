import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSearchComponent } from './teacher-search.component';

describe('TeacherSearchComponent', () => {
  let component: TeacherSearchComponent;
  let fixture: ComponentFixture<TeacherSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
