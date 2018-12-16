import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUploadComponent } from './photo-upload.component';

describe('PhotoUploadComponent', (): void => {
  let component: PhotoUploadComponent;
  let fixture: ComponentFixture<PhotoUploadComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ PhotoUploadComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(PhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
