import { Component } from '@angular/core';
import { IStore } from '../store';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../../../../../services/Common/local-storage.service';
import { IconSetService } from '@coreui/icons-angular';
import { ExportServiceService } from '../../../../../../services/Common/export-service.service';
import { StoreService } from 'src/app/services/Master/store.service';
import {
  cilFilter,
  cilPrint,
  cilSave,
  cilFile,
  cilReload,
} from '@coreui/icons';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent {
  constructor(
    private localStorageService: LocalStorageService,
    public iconSet: IconSetService,
    private exportService: ExportServiceService,
    private storeService: StoreService
  ) {
    iconSet.icons = { cilFilter, cilPrint, cilSave, cilFile, cilReload };
  }
  public dataList: IStore[] = [];

  public selecteddata: IStore = {
    storeId: '',
    storeName: '',
    location: '',
    email: '',
    isSaleStore: '',
    phoneNumber: '',
    managerName: '',
    createdByCode: '',
    createdOn: '',
    modifiedOn: '',
    modifiedByCode: '',
  };

  readonly STORAGE_KEY: string = 'Store_data';
  public columnList = [
    { field: 'storeName', label: 'Store Name', visible: true },
    { field: 'location', label: 'Store Name', visible: true },
    { field: 'email', label: 'Email', visible: true },
    { field: 'isSaleStore', label: 'Sale Store', visible: true },
    { field: 'phoneNumber', label: 'Phone', visible: true },
  ];
  public dataSource = new BehaviorSubject<IStore[]>([]);

  public search = '';
  public status = 'All';

  public sortKey = '';
  public sortDirection = '';

  public rowCount = 0;
  activePane = 0;

  get DisplayedColumns() {
    return this.columnList
      .filter((cloumn) => cloumn.visible)
      .map((column) => column.field);
  }
  DownLoadStoreList() {
    this.storeService
      .GetAllStore()
      .toPromise()
      .then((response: any) => {
        this.dataList = response;
        if (this.localStorageService.get(this.STORAGE_KEY) != null) {
          const preferences = JSON.parse(
            this.localStorageService.get(this.STORAGE_KEY) || ''
          );
          this.columnList = this.columnList.map((column) => {
            const preference = preferences.find(
              (data: any) => data.field == column.field
            );
            if (preference) {
              column.visible = preference.visible;
            }
            return column;
          });
        }
        this.GetStoreList();
      });
  }
  GetStoreList(): void {
    const items = this.dataList.filter((Stores: IStore) => {
      let allowed = this.status === 'All' || Stores.isSaleStore === this.status;
      if (allowed && this.search) {
        const matches =
          Stores.storeName
            .toLocaleUpperCase()
            .match(this.search.toLocaleUpperCase()) ||
          Stores.managerName
            .toLocaleUpperCase()
            .match(this.search.toLocaleUpperCase());
        allowed = matches != null && matches.length > 0;
      }
      return allowed;
    });

    if (this.sortKey) {
      items.sort((x, y) => {
        let xField, yField;
        if (['cookingTimeString'].indexOf(this.sortKey) !== -1) {
          xField = Number(x[this.sortKey]);
          yField = Number(y[this.sortKey]);
        } else {
          xField = x[this.sortKey].toString().toLocaleUpperCase();
          yField = y[this.sortKey].toString().toLocaleUpperCase();
        }
        if (xField === yField) return 0;
        if (xField < yField && this.sortDirection == 'asc') return -1;
        if (xField > yField && this.sortDirection == 'dsc') return -1;

        return 1;
      });
    }
    this.rowCount = items.length;
    this.dataSource.next(items);
  }

  doSort(field: string): void {
    if (field === this.sortKey) {
      this.sortDirection === 'asc'
        ? (this.sortDirection = 'dsc')
        : (this.sortDirection = 'asc');
    } else {
      this.sortKey = field;
      this.sortDirection = field;
    }
    this.GetStoreList();
  }
  ngOnInit(): void {
    this.DownLoadStoreList();
  }

  persistColumnPreference(): void {
    this.localStorageService.set(
      this.STORAGE_KEY,
      JSON.stringify(this.columnList)
    );
  }
  getRowList() {
    let data = this.dataSource.value.map((data: IStore) => {
      return {
        storeId: data.storeId,
        storeName: data.storeName,
        location: data.location,
        email: data.email,
        isSaleStore: data.isSaleStore,
        phoneNumber: data.phoneNumber,
        managerName: data.managerName,
        createdByCode: data.createdByCode,
        createdOn: data.createdOn,
        modifiedOn: data.modifiedOn,
        modifiedByCode: data.modifiedByCode,
      };
    });
    return data;
  }
  getHeaderList() {
    return this.columnList
      .filter((column) => column.field != 'action')
      .map((column) => column.field);
  }
  downloadAsPdf(type: string): void {
    let data = this.getRowList();
    const rows: any[] = [];
    data.forEach((element, index, array) => {
      rows.push([
        element.storeName,
        element.location,
        element.email,
        element.isSaleStore,
        element.phoneNumber,
        element.managerName,
      ]);
    });

    const rowList = rows;
    const headerlist = this.getHeaderList();
    const pdfData = this.exportService.convertToPdf(rowList, headerlist);
    if (type === 'download') {
      pdfData.save('Store List');
    }
    if (type === 'print') {
      const file = pdfData.output('blob');
      const objectUrl = URL.createObjectURL(file);
      const iFrame: any = document.createElement('iframe');
      iFrame.style.display = 'none';
      iFrame.src = objectUrl;
      document.body.appendChild(iFrame);
      iFrame.contentWindow.print();
    }
  }
  downloadAsExcel(): void {
    const rowList = this.getRowList();
    const headerlist = this.getHeaderList();

    const csvData = this.exportService.convertToCsv(rowList, headerlist);

    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const objectUrl = URL.createObjectURL(csvBlob);
    const link: any = document.createElement('a');

    link.download = 'Storelist.csv';
    link.href = objectUrl;
    link.click();
  }
  gotoDetail(element: IStore): void {
    this.selecteddata = element;
    this.activePane = 1;
  }
}
