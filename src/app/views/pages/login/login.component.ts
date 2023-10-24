import { Component } from '@angular/core';
import{LoginService} from '../../../services/auths/login.service'
import{AlertServiceService} from "../../../services/Common/alert-service.service"
import{LocalStorageService} from "../../../services/Common/local-storage.service"
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  customStylesValidated = false;
  username:string="";
  password:string="";

  constructor(
    private loginService: LoginService,
    private AlertService:AlertServiceService,
    private routerService:Router,
    private localStorageService:LocalStorageService
    ) { }
  onSubmit1() {
    this.customStylesValidated = true;
    if(this.username!="" && this.password!=""){
      let obj ={
        "email":this.username,
        "password":this.password
      }
      this.loginService.doLogin(obj).subscribe((response: any) => {
        console.log(response);
        this.AlertService.successNotification("Success","Login Successfully")
        let JsonUser={
          token:response.token,
          userID:response.userID,
          userName:response.userName,
          email:response.email,
        }
       this.localStorageService.set("userData",JSON.stringify(JsonUser))

       this.routerService.navigate(['dashboard'])
      },
      (error:any) => {                              //Error callback
        if(error.error.title=='InvalidCredentials')
        {
                this.AlertService.tinyAlert("UserName or Password is incorrect!")
        }


        //throw error;   //You can also throw the error to a global error handler
      })
    }

  }
}
