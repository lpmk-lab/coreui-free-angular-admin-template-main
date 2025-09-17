export interface IStore {
  [index: string]: string;

  storeId: string;
  storeName: string;
  location: string;
  phoneNumber: string;
  email: string;
  isSaleStore: string;
  managerName: string;
  createdByCode: string;
  createdOn: string;
  modifiedOn: string;
  modifiedByCode: string;
}
