import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAutoCompleteComponent } from './category-auto-complete.component';

describe('CategoryAutoCompleteComponent', () => {
  let component: CategoryAutoCompleteComponent;
  let fixture: ComponentFixture<CategoryAutoCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryAutoCompleteComponent]
    });
    fixture = TestBed.createComponent(CategoryAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
