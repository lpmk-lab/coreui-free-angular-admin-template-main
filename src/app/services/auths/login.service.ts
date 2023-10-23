import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  public doLogin(obj: object):any{
    const url = 'http://localhost:5189/auth/login';
    return this.http.post<any>(url, obj);
  }
}
