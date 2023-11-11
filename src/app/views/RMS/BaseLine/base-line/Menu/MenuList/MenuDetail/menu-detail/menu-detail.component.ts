import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IMenu } from '../.././Menu-matterdata';
import { cilSave, cilReload, cilDelete } from '@coreui/icons';

import { IconSetService } from '@coreui/icons-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MenuService } from '../../../../../../../../services/Master/menu.service'
import { AlertServiceService } from "../../../../../../../../services/Common/alert-service.service"
import { UserService } from '../../../../../../../../services/Common/user.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent {
  @Output() DownLoadmenuList: EventEmitter<any> = new EventEmitter();
  @Input() data: IMenu = {
    menuId: "",
    menuCode: "",
    menuName: "",
    photoUrl: "",
    categoryId: "",
    isNeedCook: "",
    isNeedCookString: "",
    cookingTime: "",
    cookingTimeString: "",
    isSubMenuId: "",
    categoryName: "",
    isSubMenuIDString: "",
    createdByCode: "",
    createdOn: "",
    modifiedOn: "",
    modifiedByCode: "",
  };
  TableFrom = new FormGroup({
    menuCode: new FormControl('', Validators.required),

    menuName: new FormControl('', Validators.required),
    photoUrl: new FormControl(),
    categoryId: new FormControl(),
    isNeedCook: new FormControl(),
    CookingTime: new FormControl(),
    isSubMenuId: new FormControl(),
  });

  constructor(private userService: UserService,
    private menuService: MenuService,
    private AlertService: AlertServiceService,
    public iconSet: IconSetService,
  ) {
    iconSet.icons = { cilSave, cilReload, cilDelete };
  }
  New() {
    this.TableFrom.reset({ isNeedCook: false,isSubMenuId:false });
    this.data = {
      menuId: "",
      menuCode: "",
      menuName: "",
      photoUrl: "",
      categoryId: "",
      isNeedCook: "",
      isNeedCookString: "",
      cookingTime: "",
      cookingTimeString: "",
      isSubMenuId: "",
      categoryName: "",
      isSubMenuIDString: "",
      createdByCode: "",
      createdOn: "",
      modifiedOn: "",
      modifiedByCode: "",
    };

  }
  Save() {
    if (this.TableFrom.valid) {
      let obj = {
        "MenuId": this.data.menuId,
        "MenuCode": this.data.menuCode,
        "MenuName": this.data.menuName,
        "PhotoURL": this.data.photoUrl,
        "CategoryID": this.data.categoryId,
        "isNeedCook": this.data.isNeedCook.toString(),
        "CookingTime": this.data.cookingTime.toString(),
        "isSubMenuID": this.data.isSubMenuId.toString(),

        "requestID": this.userService.getUserID()

      }
      this.menuService.Save(obj).toPromise()
        .then((response: any) => {


          this.AlertService.SuccesstinyAlert("Save Successfully")
          this.data = {
            menuId: response.menuId,
            menuCode: response.menuCode,
            menuName: response.menuName,
            photoUrl: response.photoUrl,
            categoryId: response.categoryId,
            isNeedCook: response.isNeedCook,
            isNeedCookString: response.isNeedCookString,
            cookingTime: response.cookingTime,
            cookingTimeString: response.cookingTimeString,
            isSubMenuId: response.isSubMenuId,
            categoryName: response.categoryName,
            isSubMenuIDString: response.isSubMenuIDString,
            createdByCode: response.createdByCode,
            createdOn: response.createdOn,
            modifiedOn: response.modifiedOn,
            modifiedByCode: response.modifiedByCode,

          }
          this.DownLoadmenuList.emit();
        });
    }



  }
  delete() {
    if (this.data.menuId) {
      this.menuService.Delete(this.data.menuId).toPromise()
        .then((response: any) => {

          this.AlertService.SuccesstinyAlert("Delete Successfully")
          this.New();
          this.DownLoadmenuList.emit();
        });
    }

  }

}

