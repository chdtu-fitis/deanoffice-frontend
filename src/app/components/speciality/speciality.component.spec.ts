import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityComponent } from './speciality.component';

describe('SpecialityComponent', () => {
  let component: SpecialityComponent;
  let fixture: ComponentFixture<SpecialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ SpecialityComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
