import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOrderTemplateComponent } from './student-order-template.component';

describe('StudentOrderTemplateComponent', () => {
  let component: StudentOrderTemplateComponent;
  let fixture: ComponentFixture<StudentOrderTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOrderTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
