import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from '../base-line/Table/TableList/table-list/table-list.component';
import { CategoryListComponent } from './Category/CategoryList/category-list/category-list.component';
import { MenuListComponent } from './Menu/MenuList/menu-list.component';


const routes: Routes = [
   {
  path: '',
  component: TableListComponent,
  data: {
    title: 'Table'
  }
},
{
  path: 'tables',
  component: TableListComponent,
  data: {
    title: 'Table'
  }
},
{
  path: 'categories',
  component: CategoryListComponent,
  data: {
    title: 'Category'
  }
},
{
  path: 'menus',
  component: MenuListComponent,
  data: {
    title: 'Menu'
  }
},
]


;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseLineRoutingModule { }
