import { Injectable } from '@angular/core';
import{ ApiServiceService} from'./../Common/api-service.service'

@Injectable({
  providedIn: 'root'
})
export class MenuUnitService {


  constructor(private apiService:ApiServiceService) { }
  public GetAllTable(id :string ):any{
    const url = '/master/MenuUnit/getAll/'+id;
    return this.apiService.GetMothod(url)

  }
  public Save(obj: object):any{
    const url = '/master/MenuUnit/Save';
    return this.apiService.PostMethodWithTokenHeader(url,obj)

  }
  public Delete(id: string):any{
    const url = '/master/MenuUnit/delete/'+id;
    return this.apiService.DeleteMethodWithTokenHeader(url)

  }
}
