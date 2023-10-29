import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ITable } from './tabel-matterdata';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit{
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

public columnList=['name','username',"email",'status']
public dataSource =new BehaviorSubject<ITable[]>([]);

public search="";
public status="All";
public sortKey="";
public sortDirection="";
public rowCount=0;
constructor(){

}

get DisplayedColumns(){
  return this.columnList;
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
  this.GetTableList();
}

}
