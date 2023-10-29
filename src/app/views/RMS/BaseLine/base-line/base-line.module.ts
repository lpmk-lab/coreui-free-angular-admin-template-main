import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { BaseLineRoutingModule } from './base-line-routing.module';
import { TableListComponent } from './Table/TableList/table-list/table-list.component';
import { CardModule, GridModule, NavModule, TabsModule } from '@coreui/angular';


@NgModule({
  declarations: [
    TableListComponent
  ],
  imports: [
    CommonModule,
    BaseLineRoutingModule,
    NavModule,
    TabsModule,
    GridModule,
    CardModule,
    CdkTableModule,
    FormsModule
  ]
})
export class BaseLineModule { }
