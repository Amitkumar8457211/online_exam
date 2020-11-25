import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  goback(){
    this.location.back();
  }
  gohome(){
    this.router.navigate(["/home"]);
  }

}
