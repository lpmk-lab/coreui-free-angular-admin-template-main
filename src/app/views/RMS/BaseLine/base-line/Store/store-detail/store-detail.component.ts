import { Component, Input, Output, EventEmitter } from '@angular/core';

import { cilSave, cilReload, cilDelete } from '@coreui/icons';

import { IconSetService } from '@coreui/icons-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { result } from 'lodash-es';
import { IStore } from '../store';
import { UserService } from 'src/app/services/Common/user.service';

import { AlertServiceService } from 'src/app/services/Common/alert-service.service';
import { ModalService } from '@coreui/angular';
import { StoreService } from 'src/app/services/Master/store.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss'],
})
export class StoreDetailComponent {
  @Output() DownLoadstoreList: EventEmitter<any> = new EventEmitter();

  uploadImage: any;
  file!: File;
  @Input() data: IStore = {
    storeId: '',
    storeName: '',
    location: '',
    email: '',
    isSaleStore: 'false',
    phoneNumber: '',
    managerName: '',
    createdByCode: '',
    createdOn: '',
    modifiedOn: '',
    modifiedByCode: '',
  };
  TableFrom = new FormGroup({
    storeName: new FormControl('', Validators.required),

    location: new FormControl('', Validators.required),
    email: new FormControl(),
    isSaleStore: new FormControl(),
    phoneNumber: new FormControl(),
    managerName: new FormControl(),
  });

  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private AlertService: AlertServiceService,
    public iconSet: IconSetService
  ) {
    iconSet.icons = { cilSave, cilReload, cilDelete };
  }
  New() {
    this.TableFrom.reset({ isSaleStore: false });
    this.data = {
      storeId: '',
      storeName: '',
      location: '',
      email: '',
      isSaleStore: 'false',
      phoneNumber: '',
      managerName: '',
      createdByCode: '',
      createdOn: '',
      modifiedOn: '',
      modifiedByCode: '',
    };
  }
  Save() {
    if (this.TableFrom.valid) {
      let obj = {
        storeId: this.data.storeId,
        storeName: this.data.storeName,
        location: this.data.location,
        email: this.data.email,
        isSaleStore: this.data.isSaleStore,
        phoneNumber: this.data.phoneNumber.toString(),

        managerName: this.data.managerName.toString(),

        requestID: this.userService.getUserID(),
      };
      this.storeService
        .Save(obj)
        .toPromise()
        .then((response: any) => {
          this.AlertService.SuccesstinyAlert('Save Successfully');
          this.data = {
            storeId: response.storeId,
            storeName: response.storeName,
            location: response.location,
            email: response.email,
            isSaleStore: response.isSaleStore,
            phoneNumber: response.phoneNumber,
            isNeedCmanagerNameokString: response.managerName,
            requestID: response.requestID,
            managerName: response.managerName,
            createdByCode: response.createdByCode,
            createdOn: response.createdOn,
            modifiedOn: response.modifiedOn,
            modifiedByCode: response.modifiedByCode,
          };
          this.DownLoadstoreList.emit();
        });
    }
  }
  delete() {
    if (this.data.storeId) {
      this.AlertService.confirmDeletion().then((result) => {
        if (result.isConfirmed) {
          this.storeService
            .Delete(this.data.storeId)
            .toPromise()
            .then((response: any) => {
              this.AlertService.SuccesstinyAlert('Delete Successfully');
              this.New();
              this.DownLoadstoreList.emit();
            });
        }
      });
    }
  }
}
