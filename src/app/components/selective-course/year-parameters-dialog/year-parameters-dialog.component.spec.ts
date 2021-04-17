import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {YearParametersDialogComponent} from './year-parameters-dialog.component';

describe('SelectiveParametersDialogComponent', () => {
  let component: YearParametersDialogComponent;
  let fixture: ComponentFixture<YearParametersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearParametersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearParametersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
