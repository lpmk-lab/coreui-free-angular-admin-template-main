import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUnitListComponent } from './item-unit-list.component';

describe('ItemUnitListComponent', () => {
  let component: ItemUnitListComponent;
  let fixture: ComponentFixture<ItemUnitListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemUnitListComponent]
    });
    fixture = TestBed.createComponent(ItemUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
