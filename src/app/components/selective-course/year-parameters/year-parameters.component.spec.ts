import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearParametersComponent } from './year-parameters.component';

describe('YearParametersComponent', () => {
  let component: YearParametersComponent;
  let fixture: ComponentFixture<YearParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
