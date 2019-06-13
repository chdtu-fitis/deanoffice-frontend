import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishStudyYearComponent } from './finish-study-year.component';

describe('FinishStudyYearComponent', () => {
  let component: FinishStudyYearComponent;
  let fixture: ComponentFixture<FinishStudyYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishStudyYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishStudyYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
