import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import{AlertServiceService} from "../Common/alert-service.service"
import { Router } from '@angular/router';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpErrorResponse
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../Common/loader.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(  private AlertService:AlertServiceService,
    private loader: LoaderService,
    private spinner: NgxSpinnerService,
    private routerService:Router,){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      this.loader.showLoader();
      this.spinner.show();

      return next.handle(req).pipe(
        finalize(() => this.spinner.hide()),
        catchError((error) => this.errorHandler(error)));
  }

  private errorHandler(error: HttpEvent<any>): Observable<HttpEvent<any>> {

      // Do something with the error
      if (error instanceof HttpErrorResponse)
      {
        if(error.error==null && error.status==401){
        this.AlertService.tinyAlert("Your account is expired, login again!")
        this.routerService.navigate(['login'])
      }
        if(error.error.title=='InvalidCredentials')
        {
                this.AlertService.tinyAlert("UserName or Password is incorrect!")
        }

      }

    throw error;
  }
}

