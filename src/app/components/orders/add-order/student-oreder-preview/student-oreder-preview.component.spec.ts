import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOrederPreviewComponent } from './student-oreder-preview.component';

describe('StudentOrederPreviewComponent', () => {
  let component: StudentOrederPreviewComponent;
  let fixture: ComponentFixture<StudentOrederPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOrederPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOrederPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
