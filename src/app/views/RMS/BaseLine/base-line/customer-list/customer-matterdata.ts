export interface ICustomer
{
  [index: string]: string;

  customerId: string;
  customerName:string;

  phoneNo: string;

  createdByCode: string;
  createdOn:string;
  modifiedOn:string;
  modifiedByCode:string;

}
