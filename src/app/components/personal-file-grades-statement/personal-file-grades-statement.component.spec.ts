import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFileStatementComponent } from './personal-file-statement.component';

describe('PersonalFileStatementComponent', () => {
  let component: PersonalFileStatementComponent;
  let fixture: ComponentFixture<PersonalFileStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalFileStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFileStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
