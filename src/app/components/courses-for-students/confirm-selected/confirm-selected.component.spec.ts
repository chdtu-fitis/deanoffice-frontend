import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSelectedComponent } from './confirm-selected.component';

describe('ConfirmSelectedComponent', () => {
  let component: ConfirmSelectedComponent;
  let fixture: ComponentFixture<ConfirmSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
