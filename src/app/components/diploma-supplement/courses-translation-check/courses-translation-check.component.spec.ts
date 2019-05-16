import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTranslationCheckComponent } from './courses-translation-check.component';

describe('CoursesTranslationCheckComponent', () => {
  let component: CoursesTranslationCheckComponent;
  let fixture: ComponentFixture<CoursesTranslationCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesTranslationCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesTranslationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
