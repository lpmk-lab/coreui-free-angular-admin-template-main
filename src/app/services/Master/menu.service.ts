import { Injectable } from '@angular/core';
import{ ApiServiceService} from'./../Common/api-service.service'

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private apiService:ApiServiceService) { }
  public GetAllTable():any{
    const url = '/master/Menu/getAll';
    return this.apiService.GetMothod(url)

  }
  public Save(obj: object):any{
    const url = '/master/Menu/Save';
    return this.apiService.PostMethodWithTokenHeader(url,obj)

  }
  public Delete(id: string):any{
    const url = '/master/Menu/delete/'+id;
    return this.apiService.DeleteMethodWithTokenHeader(url)

  }
}
