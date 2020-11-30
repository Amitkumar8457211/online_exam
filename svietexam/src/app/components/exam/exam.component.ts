import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthserviceService
} from './../../service/authservice.service';
import {
  LocationStrategy
} from '@angular/common';
import {
  Observable
} from 'rxjs';
import {
  Router
} from '@angular/router';
import {
  Qustion
} from './../../class/qustion';
import {
  interval
} from 'rxjs';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  username: string;
  id: number;
  time: number;
  error: string;
  qustion: number;
  message: string;
  Qustion: Observable < Qustion[] > ;
  timmer: any;
  timmerhour: number;
  timmerminute: number;
  timmersecond: number;
  attempt = [];
  stop: any;
  stoptimmer:any;
  msg:string;


  constructor(private AuthserviceService: AuthserviceService, private location: LocationStrategy, private Router: Router) {

    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });

  }

  ngOnInit(): void {

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
  
    this.AuthserviceService.shareusername
      .subscribe(data => {
        this.username = data
      });
    this.AuthserviceService.shareid
      .subscribe(data => {
        this.id = data
      });
    this.AuthserviceService.sharetime
      .subscribe(data => {
        this.time = data
      });


    this.AuthserviceService.startexam(this.username, this.id)
      .subscribe(
        data => {
          if (data) {
            console.log(data);
            this.Qustion = data;
            this.qustion = data.length;
            this.message = data.message;
          }
        },
        error => {
          window.sessionStorage.clear();
          this.AuthserviceService.updatesubjectCode("");
          this.AuthserviceService.updatetime(0);
          this.AuthserviceService.updateusername("");
          this.AuthserviceService.updatetoken("");
          this.Router.navigate(['/login']);
        });

    this.timmerhour = Math.floor(this.time / 60);
    this.timmerminute = this.time % 60;
    this.timmersecond = 0;

    if (this.time == 0) {
      setTimeout(()=> this.stoptimmer.unsubscribe(),100);
    }
      this.stoptimmer=interval(1000).subscribe(x => {
        if (this.timmersecond == 0 && this.timmerminute) {
          this.timmerminute--;
          this.timmersecond = 60;
        }
        if (this.timmerminute == 0 && this.timmerhour) {
          this.timmerhour--;
          this.timmerminute = 60;
        }
        if (this.timmerhour == 0 && this.timmerminute == 0 && this.timmersecond == 0 && this.time>0) {
          console.log(this.timmerhour +"/"+ this.timmerminute +"/"+ this.timmersecond);
          this.submitexam(" due to end of time");
          this.msg = "due to end of time";
          sessionStorage.setItem('msg', this.msg);
          this.Router.navigate(['/home']);
        }
        this.timmersecond--;
      });
    

    this.stop = interval(5000).subscribe(x => {
       if (document.hidden) {
        this.submitexam("due to go background");
        this.msg = "due to go background";
        sessionStorage.setItem('msg', this.msg);
        this.Router.navigate(['/home']);
      }
      if ((window.outerWidth < 1000 || window.outerHeight < 800) && detec()) {
        this.submitexam("due to small window");
        this.msg = "due to small window";
        sessionStorage.setItem('msg', this.msg);
        this.Router.navigate(['/home']);
      }
    });

    window.addEventListener('beforeunload', (event) => {
        event.returnValue = `Are you sure you want to leave?`;
      });
  
      window.addEventListener('unload', (event) => {
        console.log('your exam submitted due to unload window');
        this.submitexam(" due to unload window");
        this.msg = "due to go unload window";
        sessionStorage.setItem('msg', this.msg);
        this.Router.navigate(['/home']);
      });
  
      window.addEventListener('click', (event) => {
        if (!navigator.onLine) {
          alert("Please connect to internet");
        }
      });
  
      window.addEventListener('touchstart', (event) => {
        if (!navigator.onLine) {
          alert("Please connect to internet");
        }
      });
  
      window.onresize = function () {
        if (detec()) {
          console.log('your exam submitted due to change window size');
          this.submitexam(" due to change window size");
          this.msg = "due to change window size";
          sessionStorage.setItem('msg', this.msg);
          this.Router.navigate(['/home']);
        }
      }

  }

  ngOnDestroy(){
    setTimeout(()=> this.stop.unsubscribe(),100);
  }

  goback() {
    this.Router.navigate(['/home']);
  }

  submitanswer(qid, e) {

    this.attempt.push(qid);
    console.log(e.value + ":" + this.username);
    this.AuthserviceService.questionsubmit(this.username, this.id, qid, e.value)
      .subscribe(
        data => {
          if (data) {
            console.log(data.message);
          }
        },
        error => {

        });

  }

  submitexam(msg) {
    console.log("Amit"+msg);
    this.AuthserviceService.submitexam(this.username, this.id, this.msg)
    .subscribe(
      data => {
        if (data) {
          //alert(data.message);
          this.AuthserviceService.updatemessage(data.message+"  "+msg);
         // setTimeout(()=>  this.Router.navigate(['/home']),1000); 
          this.Router.navigate(['/home']);
        }
      },
      error => {

    });

  }

}


 // function detec() {
    //   if (navigator.userAgent.match(/Android/i) ||
    //     navigator.userAgent.match(/webOS/i) ||
    //     navigator.userAgent.match(/iPhone/i) ||
    //     navigator.userAgent.match(/iPad/i) ||
    //     navigator.userAgent.match(/iPod/i) ||
    //     navigator.userAgent.match(/BlackBerry/i) ||
    //     navigator.userAgent.match(/Windows Phone/i)) {
    //     return 0;
    //   } else {
    //     return 1;
    //   }
    // }

    // window.addEventListener('beforeunload', (event) => {
    //   event.returnValue = `Are you sure you want to leave?`;
    // });

    // window.addEventListener('unload', (event) => {
    //   console.log('your exam submitted due to unload window');
    //   this.submitexam();
    // });

    // window.addEventListener('click', (event) => {
    //   if (!navigator.onLine) {
    //     alert("Please connect to internet");
    //   }
    // });

    // window.addEventListener('touchstart', (event) => {
    //   if (!navigator.onLine) {
    //     alert("Please connect to internet");
    //   }
    // });

    // window.onresize = function () {
    //   if (detec()) {
    //     console.log('your exam submitted due to change window size');
    //     this.submitexam();
    //   }
    // }

    // this.stop = setInterval(function () {
    //   if (document.hidden) {
       
    //     console.log("your exam submitted due to go background");
    //     this.Router.navigate(['/home']);
    //     //this.submitexam();
    //   }

    //   if ((window.outerWidth < 1000 || window.outerHeight < 800) && detec()) {
    //     console.log("your exam submitted due to small window size");
    //     this.submitexam();
    //   }

    // }, 5000);

