import { Component,Input,Output, EventEmitter  } from '@angular/core';
import { ICategory } from '../../Category-matterdata';
import { cilSave,cilReload,cilDelete} from '@coreui/icons';

import { IconSetService } from '@coreui/icons-angular';
import {FormControl,FormGroup, Validators} from '@angular/forms'
import{CategoryService} from '../../../../../../../../../services/Master/category.service'
import{AlertServiceService} from "../../../../../../../../../services/Common/alert-service.service"
import{UserService} from'../../../../../../../../../services/Common/user.service'

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  @Output() DownLoadcategoryList: EventEmitter<any> = new EventEmitter();
  @Input() data :ICategory= {
    categoryId: "",
    categoryName: "",

    categoryIcon: "",

    createdByCode: "",
    createdOn: "",
    modifiedOn:"",
    modifiedByCode: "",
  };
  TableFrom= new FormGroup({
    categoryName:new FormControl('',Validators.required),

    categoryIcon: new FormControl('',Validators.required),

  });

  constructor(private userService:UserService,
    private categorySerive:CategoryService,
    private AlertService:AlertServiceService,
    public iconSet: IconSetService,
    ){
      iconSet.icons = {cilSave,cilReload,cilDelete };
  }
  New(){
    this.TableFrom.reset();
    this.data = {
      categoryId: "",
    categoryName: "",

    categoryIcon: "",

    createdByCode: "",
    createdOn: "",
    modifiedOn:"",
    modifiedByCode: "",
    };

  }
  Save(){
    if(this.TableFrom.valid){
      let obj ={
        "categoryId":this.data.categoryId,
        "categoryName": this.data.categoryName,
        "categoryIcon": this.data.categoryIcon,


        "requestID":this.userService.getUserID(),


      }
      this.categorySerive.Save(obj).toPromise()
      .then((response: any) => {


        this.AlertService.SuccesstinyAlert("Save Successfully")
        this.data={
          categoryId: response.categoryId,
          categoryName: response.categoryName,

          categoryIcon: response.categoryIcon,

          createdByCode: response.createdByCode,
          createdOn: response.createdOn,
          modifiedOn:response.modifiedOn,
          modifiedByCode: response.modifiedByCode,

        }
        this.DownLoadcategoryList.emit();
    });
    }



  }
  delete(){
    if(this.data.categoryId){
    this.categorySerive.Delete(this.data.categoryId).toPromise()
    .then((response: any) => {

      this.AlertService.SuccesstinyAlert("Delete Successfully")
      this.New();
      this.DownLoadcategoryList.emit();
  });
}

  }
}

