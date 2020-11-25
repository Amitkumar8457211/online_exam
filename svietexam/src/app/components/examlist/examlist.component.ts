import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './../../service/authservice.service';
import { Examlist } from './../../class/examlist';
import { LocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from './../../components/dialogbox/dialogbox.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-examlist',
  templateUrl: './examlist.component.html',
  styleUrls: ['./examlist.component.css']
})
export class ExamlistComponent implements OnInit {

  constructor(private dialog: MatDialog, private AuthserviceService: AuthserviceService , private Router: Router ,private location: LocationStrategy) {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  
  }

  Examlist: Observable<Examlist[]>;
  exam:number;
  username:string;
  error:string;
  stop:any;
  message:string;

  ngOnInit(): void {

    this.AuthserviceService.shareusername
    .subscribe(data => this.username = data)
    this.AuthserviceService.sharemessage
    .subscribe(data => this.message = data)
    this.AuthserviceService.getexamlist(this.username.substr(0,this.username.length-3))
    .subscribe(
      data => {
        if (data) {
          this.Examlist = data;
          this.exam=data.length;
        } 
      },
      error => {
        window.sessionStorage.clear();
        this.AuthserviceService.updatesubjectCode("");
        this.AuthserviceService.updatetime(0);
        this.AuthserviceService.updateusername("");
        this.AuthserviceService.updatetoken("");
        this.Router.navigate(['/login']);
      }     
    );
    
    if(this.message != "" || sessionStorage.getItem('msg')){
      this.openDialog("Exam submitted sucessfully "+sessionStorage.getItem('msg') || this.message);
      this.AuthserviceService.updatemessage("");
      sessionStorage.removeItem('msg');
    }

    function detec() {
      if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        return 0;
      } else {
        return 1;
      }
    }

    this.stop = interval(5000).subscribe(x => {
      if((window.outerWidth < 1000 || window.outerHeight < 800 ) && detec()  ){
        this.openDialog("Please go to fullscreen.");
      }
   });

  }

  ngOnDestroy(){
    setTimeout(()=> this.stop.unsubscribe(),100);
  }

  openDialog(message:string) {
    this.dialog.open(DialogboxComponent, {
      data: {message: message}
    });
  }

  logout(){
    this.AuthserviceService.logout()
    .subscribe(
      data => {
        if (data == null) {
          window.sessionStorage.clear();
          this.AuthserviceService.updatesubjectCode("");
          this.AuthserviceService.updatetime(0);
          this.AuthserviceService.updateusername("");
          this.AuthserviceService.updatetoken("");
          this.Router.navigate(['/login']);
        } else{
          this.error="Somethingh went wrong try again";
        }
      },
      error => {
        this.error="Somethingh went wrong try again";
      }     
    );   
  }

  startexam(subjectCode:string,time:number,id:number){
    sessionStorage.setItem('examid',id.toString());
    this.AuthserviceService.updatesubjectCode(subjectCode);
    this.AuthserviceService.updatetime(time);
    this.AuthserviceService.updateid(id);
    this.Router.navigate(['/exam']);
  }

}
