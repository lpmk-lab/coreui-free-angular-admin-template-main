import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import{LocalStorageService} from '../../../../../../services/Common/local-storage.service'
import{ExportServiceService} from '../../../../../../services/Common/export-service.service'
import{MenuService} from '../../../../../../services/Master/menu.service'

import { IconSetService } from '@coreui/icons-angular';
import { cilFilter,cilPrint,cilSave,cilFile,cilReload} from '@coreui/icons';
import { IMenu } from './Menu-matterdata';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  constructor(
    private localStorageService:LocalStorageService,
    public iconSet: IconSetService,
    private exportService:ExportServiceService,
    private menuService:MenuService
    ){
      iconSet.icons = { cilFilter,cilPrint,cilSave,cilFile ,cilReload};
  }
  public dataList:IMenu[] = [];

    public selecteddata:IMenu={

  menuId: "",
  menuCode:"",
  menuName: "",
  photoUrl: "",
  categoryId: "",
  categoryName: "",
  isNeedCook:"",
  cookingTime:"",
  cookingTimeString:"",
  isSubMenuID:"",
  isSubMenuIDString:"",
  isNeedCookString:"",
  createdByCode: "",
  createdOn:"",
  modifiedOn:"",
  modifiedByCode:"",

    }


readonly STORAGE_KEY:string='Menu_data';
public columnList=[
   {field:'menuCode',label:'Menu Code',visible:true},
   {field:'menuName',label:'Menu Name',visible:true},
   {field:'categoryName',label:'category Name',visible:true},
   {field:'isNeedCookString',label:'Need Cook',visible:true},
   {field:'cookingTimeString',label:'cooking Time',visible:true},
   {field:'isSubMenuIDString',label:'Sub Menu',visible:true},
   {field:'photoUrl',label:'Photo',visible:true},
]
public dataSource =new BehaviorSubject<IMenu[]>([]);

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
DownLoadmenuList(){
  this.menuService.GetAllTable().toPromise()
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
    this.GetMenuList();
  })
}
GetMenuList():void{
  const items=this.dataList.filter((menus:IMenu)=>{
    let allowed=this.status==='All' || menus.isNeedCookString===this.status;
if(allowed && this.search){
  const matches=menus.menuCode.toLocaleUpperCase().match(this.search.toLocaleUpperCase())||menus.menuName.toLocaleUpperCase().match(this.search.toLocaleUpperCase());
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
  this.GetMenuList();
}
ngOnInit(): void {
  this.DownLoadmenuList();

}

persistColumnPreference():void{
this.localStorageService.set(this.STORAGE_KEY,JSON.stringify(this.columnList));
}
getRowList(){
  let data=this.dataSource.value.map((data:IMenu)=>{
    return{

      menuId: data.menuId,
      menuCode: data.menuCode,
      menuName:data.menuName,
      photoUrl:data.photoUrl,
      categoryId:data.categoryId,
      isNeedCook:data.isNeedCook,
      isNeedCookString:data.isNeedCookString,
      cookingTime:data.cookingTime,
      cookingTimeString:data.cookingTimeString,
      isSubMenuID:data.isSubMenuID,
      categoryName:data.categoryName,
      isSubMenuIDString:data.isSubMenuIDString,
      createdByCode:data.createdByCode,
      createdOn:data.createdOn,
      modifiedOn:data.modifiedOn,
      modifiedByCode:data.modifiedByCode,
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
    rows.push([element.menuCode,element.menuName,element.categoryName,element.isNeedCookString,element.cookingTimeString,element.isSubMenuIDString,element.photoUrl])
  })

  const rowList=rows;
  const headerlist=this.getHeaderList();
  const pdfData=this.exportService.convertToPdf(rowList,headerlist);
  if(type==='download'){
    pdfData.save('Menu List');

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

  link.download='Menulist.csv';
  link.href=objectUrl;
  link.click();
}
gotoDetail(element:IMenu):void{
 this.selecteddata=element;
 this.activePane = 1;
}

}


