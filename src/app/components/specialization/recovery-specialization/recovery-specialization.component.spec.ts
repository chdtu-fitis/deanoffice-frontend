import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverySpecializationComponent } from './recovery-specialization.component';

describe('RecoverySpecializationComponent', () => {
  let component: RecoverySpecializationComponent;
  let fixture: ComponentFixture<RecoverySpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverySpecializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverySpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
