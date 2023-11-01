import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BaseLineRoutingModule } from './base-line-routing.module';
import { TableListComponent } from './Table/TableList/table-list/table-list.component';
import { CardModule, GridModule, NavModule, TabsModule,FormModule,ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { TableDetailComponent } from './Table/TableList/table-list/tabelDetail/table-detail/table-detail.component';


@NgModule({
  declarations: [
    TableListComponent,
    TableDetailComponent
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
    ButtonModule
  ]
})
export class BaseLineModule { }
