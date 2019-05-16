import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorStatisticsComponent } from './debtor-statistics.component';

describe('DebtorStatisticsComponent', () => {
  let component: DebtorStatisticsComponent;
  let fixture: ComponentFixture<DebtorStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtorStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
