import { Component } from '@angular/core';
import { MAT_RANGE_DATE_SELECTION_MODEL_FACTORY } from '@angular/material/datepicker';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { windowTime } from 'rxjs/operators';
import { AuthserviceService } from './service/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'svietexam';
  load=false;
  preload=true;

  constructor(private router: Router ,private AuthserviceService: AuthserviceService){ 



    this.router.events.subscribe((RouterEvent: Event)=>{
       if(RouterEvent instanceof NavigationStart){
        this.load = true;
       }
       if(RouterEvent instanceof NavigationEnd || RouterEvent instanceof NavigationCancel || RouterEvent instanceof NavigationError){
         this.load = false;
       }

     });
   }

}
