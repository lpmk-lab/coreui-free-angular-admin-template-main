import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseLineRoutingModule } from './base-line-routing.module';
import { TableListComponent } from './Table/TableList/table-list/table-list.component';
import {
  CardModule,
  GridModule,
  NavModule,
  TabsModule,
  FormModule,
  ButtonModule,
  ButtonGroupModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { TableDetailComponent } from './Table/TableList/table-list/tabelDetail/table-detail/table-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './Category/CategoryList/category-list/category-list.component';
import { CategoryDetailComponent } from './Category/CategoryList/category-list/CategoryDetail/category-detail/category-detail.component';
import { MenuListComponent } from './Menu/MenuList/menu-list.component';
import { MenuDetailComponent } from './Menu/MenuList/MenuDetail/menu-detail/menu-detail.component';
import { CategoryAutoCompleteComponent } from './../../../../autocomplete/category/category-auto-complete/category-auto-complete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ItemUnitListComponent } from './Menu/item-unit-list/item-unit-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-list/customer-detail/customer-detail.component';
import { StoreListComponent } from './Store/store-list/store-list.component';
import { StoreDetailComponent } from './Store/store-detail/store-detail.component';
@NgModule({
  declarations: [
    TableListComponent,
    TableDetailComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    MenuListComponent,
    MenuDetailComponent,
    CategoryAutoCompleteComponent,
    ItemUnitListComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    StoreListComponent,
    StoreDetailComponent,
  ],
  imports: [
    CommonModule,
    FormModule,
    BaseLineRoutingModule,
    NavModule,
    TabsModule,
    GridModule,
    CardModule,
    CdkTableModule,
    FormsModule,
    NgbModule,
    IconModule,
    ButtonModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class BaseLineModule {}
