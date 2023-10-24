import { Injectable } from '@angular/core';

import{ApiServiceService} from "../Common/api-service.service"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService:ApiServiceService) { }
  public doLogin(obj: object):any{
    const url = '/auth/login';
    return this.apiService.PostMethod(url,obj)

  }
}
