import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from "../../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }

    apiLink:string=environment.apiLink;
PostMethod(url:string,data:object){
    return this.http.post<any>(this.apiLink+url, data);
 }
}
