import { Component,Input  } from '@angular/core';
import { ITable } from '../../tabel-matterdata';
import{TableService} from '../../../../../../../../../services/Master/table.service'
import{AlertServiceService} from "../../../../../../../../../services/Common/alert-service.service"
import{UserService} from'../../../../../../../../../services/Common/user.service'
@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent {
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

  constructor(private userService:UserService,
    private tableService:TableService,
    private AlertService:AlertServiceService,
    ){

  }
  New(){
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
    let obj ={
      "tableID":this.data.tableId,
      "tableName": this.data.tableName,
      "tableNo": this.data.tableNo,
      "location": this.data.location,

      "requestID":this.userService.getUserID(),
      "status": this.data.status,

    }
    this.tableService.Save(obj).subscribe((response: any) => {
      console.log(response);
      this.AlertService.successNotification("Success","Save Successfully")
      let JsonUser={
        token:response.token,
        userID:response.userID,
        userName:response.userName,
        email:response.email,
      }
  });
  }
}
