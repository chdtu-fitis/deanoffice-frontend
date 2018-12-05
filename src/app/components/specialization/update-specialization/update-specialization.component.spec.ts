import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecializationComponent } from './update-specialization.component';

describe('UpdateSpecializationComponent', () => {
  let component: UpdateSpecializationComponent;
  let fixture: ComponentFixture<UpdateSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ UpdateSpecializationComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
