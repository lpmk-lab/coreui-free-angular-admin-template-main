import { Component } from '@angular/core';
import{LoginService} from '../../../services/auths/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  customStylesValidated = false;
  username:string="";
  password:string="";

  constructor(private loginService: LoginService) { }
  onSubmit1() {
    this.customStylesValidated = true;
    if(this.username!="" && this.password!=""){
      let obj ={
        "email":this.username,
        "password":this.password
      }
      this.loginService.doLogin(obj).subscribe((response: any) => {
        console.log(response);
      },
      (error:any) => {                              //Error callback
        if(error.error.title=='InvalidCredentials')
        {

        }


        //throw error;   //You can also throw the error to a global error handler
      })
    }

  }
}
