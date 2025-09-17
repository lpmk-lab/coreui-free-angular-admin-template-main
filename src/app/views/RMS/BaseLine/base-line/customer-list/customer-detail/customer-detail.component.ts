import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomer } from '../customer-matterdata';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/Common/user.service';
import { CustomerService } from 'src/app/services/Master/customer.service';
import { AlertServiceService } from 'src/app/services/Common/alert-service.service';
import { IconSetService } from '@coreui/icons-angular';
import { cilSave,cilReload,cilDelete} from '@coreui/icons';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  @Output() DownLoadcategoryList: EventEmitter<any> = new EventEmitter();
  @Input() data :ICustomer= {
    customerId: "",
    customerName: "",

    phoneNo: "",

    createdByCode: "",
    createdOn: "",
    modifiedOn:"",
    modifiedByCode: "",
  };
  CustomerForm= new FormGroup({
    customerName:new FormControl('',Validators.required),

    phoneNo: new FormControl('',Validators.required),

  });

  constructor(private userService:UserService,
    private customerSerive:CustomerService,
    private AlertService:AlertServiceService,
    public iconSet: IconSetService,
    ){
      iconSet.icons = {cilSave,cilReload,cilDelete };
  }
  New(){
    this.CustomerForm.reset();
    this.data = {
      customerId: "",
      customerName: "",

      phoneNo: "",

      createdByCode: "",
      createdOn: "",
      modifiedOn:"",
      modifiedByCode: "",
    };

  }
  Save(){
    if(this.CustomerForm.valid){
      let obj ={
        "CustomerId":this.data.customerId,
        "CustomerName": this.data.customerName,
        "PhoneNo": this.data.phoneNo,


        "RequestID":this.userService.getUserID(),


      }
      this.customerSerive.Save(obj).toPromise()
      .then((response: any) => {


        this.AlertService.SuccesstinyAlert("Save Successfully")
        this.data={
          customerId: response.customerId,
          customerName: response.customerName,

          phoneNo: response.phoneNo,

          createdByCode: response.createdByCode,
          createdOn: response.createdOn,
          modifiedOn:response.modifiedOn,
          modifiedByCode: response.modifiedByCode,

        }
        this.DownLoadcategoryList.emit();
    });
    }



  }
  delete(){    if (this.data.customerId) {
    this.AlertService.confirmDeletion().then((result) => {
      if (result.isConfirmed) {

    this.customerSerive.Delete(this.data.customerId).toPromise()
    .then((response: any) => {

      this.AlertService.SuccesstinyAlert("Delete Successfully")
      this.New();
      this.DownLoadcategoryList.emit();
  });}});
}
}


}

