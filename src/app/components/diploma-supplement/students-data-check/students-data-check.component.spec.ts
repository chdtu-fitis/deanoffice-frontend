import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDataCheckComponent } from './students-data-check.component';

describe('StudentsDataCheckComponent', () => {
  let component: StudentsDataCheckComponent;
  let fixture: ComponentFixture<StudentsDataCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsDataCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsDataCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
