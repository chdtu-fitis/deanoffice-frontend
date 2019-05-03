import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronizeWithEdeboComponent } from './synchronize-with-edebo.component';

describe('SynchronizeWithEdeboComponent', () => {
  let component: SynchronizeWithEdeboComponent;
  let fixture: ComponentFixture<SynchronizeWithEdeboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynchronizeWithEdeboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchronizeWithEdeboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
