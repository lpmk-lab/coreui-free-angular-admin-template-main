import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import{environment} from "../../../environments/environment"
  import{LocalStorageService}from './local-storage.service'
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient,private localStorageService:LocalStorageService) { }

    apiLink:string=environment.apiLink;
  PostMethod(url:string,data:object){
    return this.http.post<any>(this.apiLink+url, data);
 }

 GetMothod(url:string){
  let token="";
  let UserData=JSON.parse(this.localStorageService.get("userData") || '{}');
  if(UserData){
    token=UserData['token'];
  }
  let header = new HttpHeaders().set(
    "Authorization",
    "Bearer "+ token
  );

  return this.http.get(this.apiLink+url, {headers:header});
 }
}
