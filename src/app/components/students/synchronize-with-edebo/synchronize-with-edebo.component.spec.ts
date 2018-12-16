import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronizeWithEdeboComponent } from './synchronize-with-edebo.component';

describe('SynchronizeWithEdeboComponent', (): void => {
  let component: SynchronizeWithEdeboComponent;
  let fixture: ComponentFixture<SynchronizeWithEdeboComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ SynchronizeWithEdeboComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(SynchronizeWithEdeboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
