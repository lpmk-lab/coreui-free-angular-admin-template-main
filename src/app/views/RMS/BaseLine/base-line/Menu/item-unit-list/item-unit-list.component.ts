import { Component, effect, inject, Input, signal } from '@angular/core';
import { UnitItem } from './Item-Unit';
import{MenuUnitService} from '../../../../../../services/Master/menu-unit.service'
import { AlertServiceService } from 'src/app/services/Common/alert-service.service';
import { UserService } from 'src/app/services/Common/user.service';
@Component({
  selector: 'app-item-unit-list',
  templateUrl: './item-unit-list.component.html',
  styleUrls: ['./item-unit-list.component.scss']
})
export class ItemUnitListComponent {
  items: UnitItem[] = [

  ];
  ngOnInit(): void {
    this.DownLoadmenuUnitList();

  }
  private _currentMenuID = signal<string>("");

  // Create an effect to react to changes in the signal
  private menuIDEffect = effect(() => {
    const newMenuID = this._currentMenuID();
    this.onCurrentMenuIDChange(newMenuID);
  });

  // Use the Input setter to update the signal
  @Input()
  set currentMenuID(value: string) {
    this._currentMenuID.set(value);
  }

  get currentMenuID(): string {
    return this._currentMenuID();
  }

  onCurrentMenuIDChange(newMenuID: string): void {
    // Your logic here
    this.DownLoadmenuUnitList()
  }

  menuUnitService:MenuUnitService=inject(MenuUnitService)
  AlertService:AlertServiceService=inject(AlertServiceService)
  userService:UserService=inject(UserService)
  DownLoadmenuUnitList(){
    if(this.currentMenuID==""){
      this.items = [];
      this.editMode= this.items.map(() => false);
      return
    }
    this.menuUnitService.GetAllTable(this.currentMenuID).subscribe(
      (response: any) => {
        this.items = response;
       this.editMode= this.items.map(() => false);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      })

  }
  editMode: boolean[] = [];

  // Method to toggle edit mode
  toggleEditMode(index: number): void {
    this.editMode[index] = !this.editMode[index];
    if(this.items[index].unitId==""||this.items[index].unitId==null){
      this.items.splice(index, 1);
      this.editMode= this.items.map(() => false);
    }

  }

  // Method to save the edited item
  saveItem(index: number): void {
    this.editMode[index] = false;
    let currentEdittItem=this.items[index]
    this.Save(currentEdittItem)
    // Add your save logic here
  }

  // Method to add a new item
  addItem(): void {
    let index=this.editMode.findIndex(x=> x==true)
    if(index>0){
      this.AlertService.SuccesstinyAlert("Please Complete the First One")
      return
    }
    else if(this.currentMenuID==""){
      this.AlertService.SuccesstinyAlert("Please Save the Menu First ")
      return
    }
    const newItem: UnitItem = {
      unitId:"", // Simple ID generation
      menuId: this.currentMenuID,
      unitLabel: '',
      price: 0,
      barcode: '',
      qrcode: '',
      itLowerUnit: false,
      convertQty: 0,
    };
    this.items.push(newItem);
    let length=(this.editMode.length-1)+1;
    this.editMode[length]=true; // Automatically enable edit mode for the new item
  }
  Save(item :UnitItem) {

      let obj = {
        "UnitId": item.unitId,
        "MenuId": item.menuId,
        "UnitLabel": item.unitLabel,
        "Price": item.price.toString(),
        "Barcode": item.barcode,
        "Qrcode": item.qrcode.toString(),
        "ItLowerUnit": item.itLowerUnit.toString(),
        "ConvertQty": item.convertQty.toString(),

        "requestID": this.userService.getUserID()

      }
      this.menuUnitService.Save(obj).toPromise()
        .then((response: any) => {


          this.AlertService.SuccesstinyAlert("Save Successfully")

          this.DownLoadmenuUnitList();
        });




  }
  // Method to delete an item
  // deleteItem(index: number): void {
  //   this.items.splice(index, 1);
  //   this.editMode.splice(index, 1); // Remove the corresponding edit mode state
  // }
  delete(id:string) {
    if (id!="" &&id!=null) {
      this.AlertService.confirmDeletion().then((result) => {
        if (result.isConfirmed) {
      this.menuUnitService.Delete(id).toPromise()
        .then((response: any) => {

          this.AlertService.SuccesstinyAlert("Delete Successfully")

          this.DownLoadmenuUnitList();
        });
    }
  })
    }

  }
}
