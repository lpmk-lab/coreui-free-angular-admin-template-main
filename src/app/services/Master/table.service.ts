import { Injectable } from '@angular/core';

import{ApiServiceService} from "../Common/api-service.service"
@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private apiService:ApiServiceService) { }
  public GetAllTable():any{
    const url = '/master/tabels/getAll';
    return this.apiService.GetMothod(url)

  }
  public Save(obj: object):any{
    const url = '/master/tabels/Save';
    return this.apiService.PostMethodWithTokenHeader(url,obj)

  }
  public Delete(id: string):any{
    const url = '/master/tabels/delete/'+id;
    return this.apiService.DeleteMethodWithTokenHeader(url)

  }
}
