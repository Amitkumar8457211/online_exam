import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  finalize } from 'rxjs/operators';
import { AuthserviceService} from '../service/authservice.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public AuthserviceService: AuthserviceService) {}
  activeRequests = false;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(this.activeRequests)) {
      this.AuthserviceService.startLoading();
  }
  if(this.AuthserviceService.getToken()){
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${this.AuthserviceService.getToken()}`
      }
    });
  }

    this.activeRequests = true;

    return next.handle(request).pipe(
      finalize(() => {
          this.activeRequests = false;
          if ((!this.activeRequests)) {
              console.log("loader stop");
              this.AuthserviceService.stopLoading();
          }
      })
  );
  }
}
