import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdeboDiplomaNumberComponent } from './edebo-diploma-number.component';

describe('EdeboDiplomaNumberComponent', () => {
  let component: EdeboDiplomaNumberComponent;
  let fixture: ComponentFixture<EdeboDiplomaNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdeboDiplomaNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdeboDiplomaNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
