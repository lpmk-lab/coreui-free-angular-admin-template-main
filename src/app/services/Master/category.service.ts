import { Injectable } from '@angular/core';

import{ApiServiceService} from "../Common/api-service.service"
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService:ApiServiceService) { }
  public GetAllCategory():any{
    const url = '/master/categorys/getAll';
    return this.apiService.GetMothod(url)

  }
  public Save(obj: object):any{
    const url = '/master/categorys/Save';
    return this.apiService.PostMethodWithTokenHeader(url,obj)

  }
  public Delete(id: string):any{
    const url = '/master/categorys/delete/'+id;
    return this.apiService.DeleteMethodWithTokenHeader(url)

  }
}
