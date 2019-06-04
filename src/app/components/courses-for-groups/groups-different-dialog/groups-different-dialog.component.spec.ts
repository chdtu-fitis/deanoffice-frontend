import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDifferentDialogComponent } from './groups-different-dialog.component';

describe('GroupsDifferentDialogComponent', () => {
  let component: GroupsDifferentDialogComponent;
  let fixture: ComponentFixture<GroupsDifferentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsDifferentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDifferentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
