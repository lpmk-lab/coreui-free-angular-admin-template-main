import { Injectable } from '@angular/core';
import{LocalStorageService}from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService:LocalStorageService) { }

  getUserID(){
    let UserID="";
  let UserData=JSON.parse(this.localStorageService.get("userData") || '{}');
  if(UserData){
    UserID=UserData['userID'];
  }
  return UserID;
  }

  getUserToken(){
    let token="";
    let UserData=JSON.parse(this.localStorageService.get("userData") || '{}');
  if(UserData){
    token=UserData['token'];
  }
  return token

  }
}
