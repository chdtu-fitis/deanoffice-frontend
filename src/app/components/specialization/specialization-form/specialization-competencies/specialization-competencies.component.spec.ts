import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationCompetenciesComponent } from './specialization-competencies.component';

describe('SpecializationCompetenciesComponent', () => {
  let component: SpecializationCompetenciesComponent;
  let fixture: ComponentFixture<SpecializationCompetenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializationCompetenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationCompetenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
