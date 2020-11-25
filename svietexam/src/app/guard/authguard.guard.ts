import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './../service/authservice.service'


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

constructor(private AuthserviceService:AuthserviceService, private Router:Router){}
  canActivate() :boolean{
    if(this.AuthserviceService.loggedin()){
      return true;
    }else{
      this.Router.navigate(['./login'])
      return false;
    }
  }
  
}
