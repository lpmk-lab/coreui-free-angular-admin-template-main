import { Component,Input,OnInit,EventEmitter,Output } from '@angular/core';
import{FormGroupDirective,FormGroup} from '@angular/forms'
import{ICategory} from './../../../views/RMS/BaseLine/base-line/Category/CategoryList/category-list/Category-matterdata'
import { BehaviorSubject } from 'rxjs';
import{CategoryService} from '../../../services/Master/category.service'
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-category-auto-complete',
  templateUrl: './category-auto-complete.component.html',
  styleUrls: ['./category-auto-complete.component.scss']
})
export class CategoryAutoCompleteComponent  implements OnInit{
  @Output() ChangeCategory: EventEmitter<any> = new EventEmitter();
  @Input() seletedID:string=""
  @Input() seletedName:string=""
  form!:FormGroup
  public dataList:ICategory[] = [];

  constructor(
    private rootFromGroup:FormGroupDirective,
     private categorySerive:CategoryService,
     private config:NgSelectConfig
    ){
      this.config.notFoundText = 'Custom not found';
      this.config.appendTo = 'body';

      this.config.bindValue = 'value';

    // this.conSetup(this.config)
  }
  conSetup(config:NgSelectConfig){

  }
  ngOnInit():void{
 this.form=this.rootFromGroup.control
 this.DownLoadcategoryList();
  }

  DownLoadcategoryList(){
    this.categorySerive.GetAllCategory().toPromise()
    .then((response: any) => {
      this.dataList=response;


    })
  }







change(){
  this.ChangeCategory.emit(this.seletedID+'~'+this.seletedName)
}


}
