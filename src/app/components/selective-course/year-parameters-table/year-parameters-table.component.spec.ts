import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearParametersTableComponent } from './year-parameters-table.component';

describe('YearParametersComponent', () => {
  let component: YearParametersTableComponent;
  let fixture: ComponentFixture<YearParametersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearParametersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearParametersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
