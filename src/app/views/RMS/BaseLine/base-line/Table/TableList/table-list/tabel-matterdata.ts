export interface ITable
{
  [index: string]: string;

  tableId: string;
  tableName:string;

  tableNo: string;
  location: string;
  status:string;
  createdByCode: string;
  createdOn:string;
  modifiedOn:string;
  modifiedByCode:string;

}
