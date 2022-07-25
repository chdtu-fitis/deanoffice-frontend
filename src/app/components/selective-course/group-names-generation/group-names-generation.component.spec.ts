import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNamesGenerationComponent } from './group-names-generation.component';

describe('GroupNamesGenerationComponent', () => {
  let component: GroupNamesGenerationComponent;
  let fixture: ComponentFixture<GroupNamesGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNamesGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNamesGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
