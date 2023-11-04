import { Component, OnInit} from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import{LocalStorageService} from '../../../../../../../services/Common/local-storage.service'
import{ExportServiceService} from '../../../../../../../services/Common/export-service.service'
import{TableService} from '../../../../../../../services/Master/table.service'

import { IconSetService } from '@coreui/icons-angular';
import { cilFilter,cilPrint,cilSave,cilFile,cilReload} from '@coreui/icons';
import { ITable } from './tabel-matterdata';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit{
  constructor(
    private localStorageService:LocalStorageService,
    public iconSet: IconSetService,
    private exportService:ExportServiceService,
    private tableService:TableService
    ){
      iconSet.icons = { cilFilter,cilPrint,cilSave,cilFile ,cilReload};
  }
  public dataList:ITable[] = [];

    public selecteddata:ITable={
      tableId: "",
      tableName: "",

      tableNo: "",
      location: "",
      status: "Active",
      createdByCode: "",
      createdOn: "",
      modifiedOn:"",
      modifiedByCode: "",
    }


readonly STORAGE_KEY:string='Table_data';
public columnList=[
   {field:'tableName',label:'Table Name',visible:true},
   {field:'tableNo',label:'Table No',visible:true},
   {field:'location',label:'Location',visible:true},
   {field:'status',label:'status',visible:true},
]
public dataSource =new BehaviorSubject<ITable[]>([]);

public search="";
public status="All";

public sortKey="";
public sortDirection="";

public rowCount=0;
activePane = 0;

get DisplayedColumns(){
  return this.columnList
  .filter(cloumn=>cloumn.visible)
  .map(column=>column.field)
  ;
}
DownLoadtableList(){
  this.tableService.GetAllTable().toPromise()
  .then((response: any) => {
    this.dataList=response;
    if(this.localStorageService.get(this.STORAGE_KEY)!=null){
      const preferences=JSON.parse(this.localStorageService.get(this.STORAGE_KEY)||'');
      this.columnList=this.columnList.map((column)=>{
        const preference=preferences.find((data:any) => data.field== column.field);
        if(preference){
          column.visible=preference.visible;
        }
        return column;
      });
    }
    this.GetTableList();
  })
}
GetTableList():void{
  const items=this.dataList.filter((tables:ITable)=>{
    let allowed=this.status==='All' || tables.status===this.status;
if(allowed && this.search){
  const matches=tables.tableName.toLocaleUpperCase().match(this.search.toLocaleUpperCase())||tables.location.toLocaleUpperCase().match(this.search.toLocaleUpperCase());
  allowed = matches != null && matches.length>0;
}
return allowed;
  });

  if(this.sortKey){
    items.sort((x,y)=>{
    let xField,yField;
    if(['id'].indexOf(this.sortKey)!==-1){
      xField=Number(x[this.sortKey]);
      yField=Number(y[this.sortKey]);
    }else{
      xField=x[this.sortKey].toString().toLocaleUpperCase();
      yField=y[this.sortKey].toString().toLocaleUpperCase();
    }
    if(xField===yField)return 0;
    if(xField<yField &&  this.sortDirection=='asc') return -1;
    if(xField>yField && this.sortDirection=='dsc')return -1;



    return 1;
    });

  }
   this.rowCount=items.length;
   this.dataSource.next(items);
}

doSort(field:string):void{
  if(field===this.sortKey){
    this.sortDirection==='asc'?this.sortDirection='dsc':this.sortDirection='asc';
  }
  else{
    this.sortKey=field;
    this.sortDirection=field;
  }
  this.GetTableList();
}
ngOnInit(): void {
  this.DownLoadtableList();

}

persistColumnPreference():void{
this.localStorageService.set(this.STORAGE_KEY,JSON.stringify(this.columnList));
}
getRowList(){
  let data=this.dataSource.value.map((data:ITable)=>{
    return{

      tableName: data.tableName,
      tableNo: data.tableNo,
      location:data.location,
      status:data.status,
    };
  })
  return data

}
getHeaderList(){
  return this.columnList
  .filter(column=>column.field!='action')
  .map(column=>column.field)
}
downloadAsPdf(type:string):void{
  let data=this.getRowList();
  const rows:any[]=[];
  data.forEach((element,index,array)=>{
    rows.push([element.tableName,element.tableNo,element.location,element.status])
  })

  const rowList=rows;
  const headerlist=this.getHeaderList();
  const pdfData=this.exportService.convertToPdf(rowList,headerlist);
  if(type==='download'){
    pdfData.save('Table List');

  }
  if(type==='print'){
    const file=pdfData.output('blob');
    const objectUrl=URL.createObjectURL(file);
    const iFrame:any=document.createElement('iframe');
    iFrame.style.display='none';
    iFrame.src=objectUrl;
    document.body.appendChild(iFrame);
    iFrame.contentWindow.print();

  }
}
downloadAsExcel():void{
  const rowList=this.getRowList();
  const headerlist=this.getHeaderList();

  const csvData=this.exportService.convertToCsv(rowList,headerlist);

  const csvBlob=new Blob([csvData],{type:'text/csv'});
  const objectUrl=URL.createObjectURL(csvBlob);
  const link:any=document.createElement('a');

  link.download='Tablelist.csv';
  link.href=objectUrl;
  link.click();
}
gotoDetail(element:ITable):void{
 this.selecteddata=element;
 this.activePane = 1;
}

}




