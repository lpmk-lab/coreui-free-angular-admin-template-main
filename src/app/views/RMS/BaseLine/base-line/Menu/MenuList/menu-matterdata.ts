export interface IMenu
{
  [index: string]: string;

  menuId: string;
  menuCode:string;
  menuName: string;
  photoUrl: string;
  categoryId: string;
  categoryName: string;
  isNeedCook:string;
  cookingTime:string;
  cookingTimeString:string;
  isSubMenuId:string;
  isSubMenuIDString:string;
  isNeedCookString:string;
  createdByCode: string;
  createdOn:string;
  modifiedOn:string;
  modifiedByCode:string;

}
