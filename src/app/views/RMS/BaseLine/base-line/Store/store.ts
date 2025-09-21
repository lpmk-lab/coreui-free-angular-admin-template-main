export interface IStore {
  [index: string]: string | Boolean;

  storeId: string;
  storeName: string;
  location: string;
  phoneNumber: string;
  email: string;
  isSaleStore: boolean;
  managerName: string;
  createdByCode: string;
  createdOn: string;
  modifiedOn: string;
  modifiedByCode: string;
}
