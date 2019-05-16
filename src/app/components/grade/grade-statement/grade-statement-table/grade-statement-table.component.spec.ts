import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeStatementTableComponent } from './grade-statement-table.component';

describe('GradeStatementTableComponent', () => {
  let component: GradeStatementTableComponent;
  let fixture: ComponentFixture<GradeStatementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeStatementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeStatementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
