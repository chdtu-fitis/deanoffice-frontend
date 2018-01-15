import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiplomaSupplementComponent} from './diploma-supplement.component';

describe('DiplomaSupplementComponent', () => {
  let component: DiplomaSupplementComponent;
  let fixture: ComponentFixture<DiplomaSupplementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomaSupplementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaSupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
