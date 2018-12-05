import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecializationComponent } from './delete-specialization.component';

describe('DeleteSpecializationComponent', () => {
  let component: DeleteSpecializationComponent;
  let fixture: ComponentFixture<DeleteSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ DeleteSpecializationComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
