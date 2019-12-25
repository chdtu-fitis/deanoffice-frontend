import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarSubjectsComponent } from './similar-subjects.component';

describe('SimilarSubjectsComponent', () => {
  let component: SimilarSubjectsComponent;
  let fixture: ComponentFixture<SimilarSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
