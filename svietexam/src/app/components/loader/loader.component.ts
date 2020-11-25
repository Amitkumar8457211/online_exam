import { Component, OnInit } from '@angular/core';
import {AuthserviceService } from './../../service/authservice.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor( private AuthserviceService:AuthserviceService ) { }

  isLoading = true;

  ngOnInit(): void {

    this.AuthserviceService.isLoading.subscribe(result => {
      this.isLoading = result;
    });
  }

}
