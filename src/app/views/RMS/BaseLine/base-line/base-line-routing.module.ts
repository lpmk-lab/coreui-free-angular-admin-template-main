import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from '../base-line/Table/TableList/table-list/table-list.component';
import { CategoryListComponent } from './Category/CategoryList/category-list/category-list.component';
import { MenuListComponent } from './Menu/MenuList/menu-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { StoreListComponent } from './Store/store-list/store-list.component';

const routes: Routes = [
  {
    path: '',
    component: TableListComponent,
    data: {
      title: 'Table',
    },
  },
  {
    path: 'tables',
    component: TableListComponent,
    data: {
      title: 'Table',
    },
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    data: {
      title: 'Category',
    },
  },
  {
    path: 'menus',
    component: MenuListComponent,
    data: {
      title: 'Menu',
    },
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    data: {
      title: 'Customer',
    },
  },
  {
    path: 'stores',
    component: StoreListComponent,
    data: {
      title: 'Store',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseLineRoutingModule {}
