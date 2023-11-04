import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import{environment} from "../../../environments/environment"
  import{LocalStorageService}from './local-storage.service'
  import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private userService:UserService,
    private http:HttpClient,
    private localStorageService:LocalStorageService,
    private userSerive:UserService
    ) { }

    apiLink:string=environment.apiLink;
  PostMethod(url:string,data:object){
    return this.http.post<any>(this.apiLink+url, data);
 }

 GetMothod(url:string){
  let token="";
  token=this.userSerive.getUserToken();
  let header = new HttpHeaders().set(
    "Authorization",
    "Bearer "+ token
  );
  return this.http.get(this.apiLink+url, {headers:header});
 }
 PostMethodWithTokenHeader(url:string,data:object){
  let token="";
  token=this.userSerive.getUserToken();
  let header = new HttpHeaders().set(
    "Authorization",
    "Bearer "+ token
  );
  return this.http.post<any>(this.apiLink+url,data ,{headers:header}, );
}
DeleteMethodWithTokenHeader(url:string){
  let token="";
  token=this.userSerive.getUserToken();
  let header = new HttpHeaders().set(
    "Authorization",
    "Bearer "+ token
  );
  return this.http.delete<any>(this.apiLink+url+'/'+this.userService.getUserID() ,{headers:header}, );
}

}
