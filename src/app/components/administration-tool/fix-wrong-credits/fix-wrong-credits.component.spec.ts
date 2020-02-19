import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixWrongCreditsComponent } from './fix-wrong-credits.component';

describe('FixWrongCreditsComponent', () => {
  let component: FixWrongCreditsComponent;
  let fixture: ComponentFixture<FixWrongCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixWrongCreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixWrongCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
