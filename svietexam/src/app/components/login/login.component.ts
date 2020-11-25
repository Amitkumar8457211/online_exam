import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from './../../service/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private AuthserviceService: AuthserviceService , private Router: Router) {}

  ngOnInit(): void {}

  hide :boolean = true;
  username: string;
  password: string;
  error: string;

  name = new FormControl('', [Validators.required]);
  getErrorMessagegmail() {
    if (this.name.hasError('required')) {
      return 'You must enter a username';
    }
  }

  pass = new FormControl('', [Validators.required]);
  getErrorMessagepassword() {
    if (this.pass.hasError('required')) {
      return 'You must enter a password';
    }
  }

  login() {
    if(this.username != '' && this.password != ''){
      this.AuthserviceService.login(this.username, this.password)
      .subscribe(
        data => {
          if (data.token) {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', this.username);
            this.AuthserviceService.updatetoken(data.token);
            this.AuthserviceService.updateusername(this.username);
            this.Router.navigate(['/home']);
          } else {
            this.error="Invalid username and password";
          }
        },
        error => {
          this.error="Invalid username and password";
        }
      );

    }else{
      this.error="Please filled username and password";
    }
   
  }

}
