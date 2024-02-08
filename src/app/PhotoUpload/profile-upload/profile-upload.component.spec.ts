import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUploadComponent } from './profile-upload.component';

describe('ProfileUploadComponent', () => {
  let component: ProfileUploadComponent;
  let fixture: ComponentFixture<ProfileUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileUploadComponent]
    });
    fixture = TestBed.createComponent(ProfileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
