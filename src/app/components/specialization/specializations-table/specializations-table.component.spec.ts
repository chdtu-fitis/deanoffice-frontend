import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationsTableComponent } from './specializations-table.component';

describe('SpecializationsTableComponent', () => {
  let component: SpecializationsTableComponent;
  let fixture: ComponentFixture<SpecializationsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializationsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
