import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectforgroupComponent } from './subjectforgroup.component';

describe('SubjectforgroupComponent', () => {
  let component: SubjectforgroupComponent;
  let fixture: ComponentFixture<SubjectforgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectforgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectforgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
