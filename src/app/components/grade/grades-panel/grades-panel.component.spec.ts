import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesPanelComponent } from './grades-panel.component';

describe('GradesPanelComponent', () => {
  let component: GradesPanelComponent;
  let fixture: ComponentFixture<GradesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
