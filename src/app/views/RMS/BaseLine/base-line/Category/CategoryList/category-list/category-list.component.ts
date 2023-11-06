import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IconSetService } from '@coreui/icons-angular';
import { ExportServiceService } from 'src/app/services/Common/export-service.service';
import { LocalStorageService } from 'src/app/services/Common/local-storage.service';
import { CategoryService } from 'src/app/services/Master/category.service';
import { cilFilter,cilPrint,cilSave,cilFile,cilReload} from '@coreui/icons';
import { ICategory } from './Category-matterdata';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{
  constructor(
    private localStorageService:LocalStorageService,
    public iconSet: IconSetService,
    private exportService:ExportServiceService,
    private categorySerive:CategoryService,

    ){
      iconSet.icons = { cilFilter,cilPrint,cilSave,cilFile ,cilReload};
  }
  public dataList:ICategory[] = [];

    public selecteddata:ICategory={
      categoryId: "",
      categoryName: "",

      categoryIcon: "",
      createdByCode: "",
      createdOn: "",
      modifiedOn:"",
      modifiedByCode: "",
    }


readonly STORAGE_KEY:string='category_data';
public columnList=[
   {field:'categoryName',label:'Category Name',visible:true},
   {field:'categoryIcon',label:'Category Icon',visible:true}
]
public dataSource =new BehaviorSubject<ICategory[]>([]);

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
DownLoadcategoryList(){
  this.categorySerive.GetAllCategory().toPromise()
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
    this.GetCategoryList();
  })
}
GetCategoryList():void{
  const items=this.dataList.filter((categorys:ICategory)=>{
    let allowed:any=[];
if( this.search){
  const matches=categorys.categoryName.toLocaleUpperCase().match(this.search.toLocaleUpperCase())||categorys.categoryIcon.toLocaleUpperCase().match(this.search.toLocaleUpperCase());
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
  this.GetCategoryList();
}
ngOnInit(): void {
  this.DownLoadcategoryList();

}

persistColumnPreference():void{
this.localStorageService.set(this.STORAGE_KEY,JSON.stringify(this.columnList));
}
getRowList(){
  let data=this.dataSource.value.map((data:ICategory)=>{
    return{

      categoryName: data.categoryName,
      categoryIcon: data.categoryIcon,

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
    rows.push([element.categoryName,element.categoryIcon])
  })

  const rowList=rows;
  const headerlist=this.getHeaderList();
  const pdfData=this.exportService.convertToPdf(rowList,headerlist);
  if(type==='download'){
    pdfData.save('Category List');

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

  link.download='Categorylist.csv';
  link.href=objectUrl;
  link.click();
}
gotoDetail(element:ICategory):void{
 this.selecteddata=element;
 this.activePane = 1;
}

}

