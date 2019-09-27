import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryGroupComponent } from './recovery-group.component';

describe('RecoveryGroupComponent', () => {
  let component: RecoveryGroupComponent;
  let fixture: ComponentFixture<RecoveryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
