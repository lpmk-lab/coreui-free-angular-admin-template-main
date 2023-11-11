import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDetailComponent } from './menu-detail.component';

describe('MenuDetailComponent', () => {
  let component: MenuDetailComponent;
  let fixture: ComponentFixture<MenuDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuDetailComponent]
    });
    fixture = TestBed.createComponent(MenuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
