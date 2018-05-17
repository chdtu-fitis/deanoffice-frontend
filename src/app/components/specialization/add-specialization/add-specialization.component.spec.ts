import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecializationComponent } from './add-specialization.component';

describe('AddSpecializationComponent', () => {
  let component: AddSpecializationComponent;
  let fixture: ComponentFixture<AddSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
