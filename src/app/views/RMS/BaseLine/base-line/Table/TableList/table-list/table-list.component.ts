import { Component, OnInit} from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import{LocalStorageService} from '../../../../../../../services/Common/local-storage.service'
import{ExportServiceService} from '../../../../../../../services/Common/export-service.service'

import { IconSetService } from '@coreui/icons-angular';
import { cilFilter,cilPrint,cilSave,cilFile} from '@coreui/icons';
import { ITable } from './tabel-matterdata';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit{
  constructor(private localStorageService:LocalStorageService,
    public iconSet: IconSetService,
    private exportService:ExportServiceService){
      iconSet.icons = { cilFilter,cilPrint,cilSave,cilFile };
  }
  public dataList:ITable[] = [
    {
      id: "1",
      status:'Inactive',
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: "2",
      status:'Active',
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },

    // ... list of items

    {
      id: "11",
      status:'Active',
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];

readonly STORAGE_KEY:string='Table_data';
public columnList=[
   {field:'name',label:'Name',visible:true},
   {field:'username',label:'User Name',visible:true},
   {field:'email',label:'Email',visible:true},
   {field:'status',label:'status',visible:true},
]
public dataSource =new BehaviorSubject<ITable[]>([]);

public search="";
public status="All";

public sortKey="";
public sortDirection="";

public rowCount=0;


get DisplayedColumns(){
  return this.columnList
  .filter(cloumn=>cloumn.visible)
  .map(column=>column.field)
  ;
}
GetTableList():void{
  const items=this.dataList.filter((tables:ITable)=>{
    let allowed=this.status==='All' || tables.status===this.status;
if(allowed && this.search){
  const matches=tables.username.toLocaleUpperCase().match(this.search.toLocaleUpperCase())||tables.email.toLocaleUpperCase().match(this.search.toLocaleUpperCase());
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
}

persistColumnPreference():void{
this.localStorageService.set(this.STORAGE_KEY,JSON.stringify(this.columnList));
}
getRowList(){
  let data=this.dataSource.value.map((data:ITable)=>{
    return{

      name: data.name,
      username: data.username,
      email:data.email,
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
    rows.push([element.name,element.username,element.email,element.status])
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
}
