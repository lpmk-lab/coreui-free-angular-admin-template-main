import { Injectable } from '@angular/core';

import{ApiServiceService} from "../Common/api-service.service"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService:ApiServiceService) { }
  public GetAllCustomer():any{
    const url = '/master/customers/getAll';
    return this.apiService.GetMothod(url)

  }
  public Save(obj: object):any{
    const url = '/master/customers/Save';
    return this.apiService.PostMethodWithTokenHeader(url,obj)

  }
  public Delete(id: string):any{
    const url = '/master/customers/delete/'+id;
    return this.apiService.DeleteMethodWithTokenHeader(url)

  }
}
