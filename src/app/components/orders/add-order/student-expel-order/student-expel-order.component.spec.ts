import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExpelOrderComponent } from './student-expel-order.component';

describe('DeductionOrderComponent', () => {
  let component: StudentExpelOrderComponent;
  let fixture: ComponentFixture<StudentExpelOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExpelOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExpelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
