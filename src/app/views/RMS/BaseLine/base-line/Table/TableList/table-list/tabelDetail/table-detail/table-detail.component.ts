import { Component,Input,Output, EventEmitter  } from '@angular/core';
import { ITable } from '../../tabel-matterdata';

import {FormControl,FormGroup,Validator, Validators} from '@angular/forms'
import{TableService} from '../../../../../../../../../services/Master/table.service'
import{AlertServiceService} from "../../../../../../../../../services/Common/alert-service.service"
import{UserService} from'../../../../../../../../../services/Common/user.service'
@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent {

  @Output() DownLoadtableList: EventEmitter<any> = new EventEmitter();
  @Input() data :ITable= {
    tableId: "",
    tableName: "",

    tableNo: "",
    location: "",
    status: "Active",
    createdByCode: "",
    createdOn: "",
    modifiedOn:"",
    modifiedByCode: "",
  };
  TableFrom= new FormGroup({
    tableName:new FormControl('',Validators.required),

    tableNo: new FormControl('',Validators.required),
    status:new FormControl(),
    location:new FormControl()
  });

  constructor(private userService:UserService,
    private tableService:TableService,
    private AlertService:AlertServiceService,
    ){

  }
  New(){
    this.TableFrom.reset({status:'Active'});
    this.data = {
      tableId: "",
      tableName: "",

      tableNo: "",
      location: "",
      status: "Active",
      createdByCode: "",
      createdOn: "",
      modifiedOn:"",
      modifiedByCode: "",
    };

  }
  Save(){
    if(this.TableFrom.valid){
      let obj ={
        "tableID":this.data.tableId,
        "tableName": this.data.tableName,
        "tableNo": this.data.tableNo,
        "location": this.data.location,

        "requestID":this.userService.getUserID(),
        "status": this.data.status,

      }
      this.tableService.Save(obj).toPromise()
      .then((response: any) => {

        this.AlertService.successNotification("Success","Save Successfully")
        this.data={
          tableId: response.tableId,
          tableName: response.tableName,

          tableNo: response.tableNo,
          location: response.location,
          status: response.status,
          createdByCode: response.createdByCode,
          createdOn: response.createdOn,
          modifiedOn:response.modifiedOn,
          modifiedByCode: response.modifiedByCode,

        }
        this.DownLoadtableList.emit();
    });
    }



  }
  delete(){
    if(this.data.tableId){
    this.tableService.Delete(this.data.tableId).toPromise()
    .then((response: any) => {

      this.AlertService.successNotification("Success","Delete Successfully")
      this.New();
      this.DownLoadtableList.emit();
  });
}

  }
}
