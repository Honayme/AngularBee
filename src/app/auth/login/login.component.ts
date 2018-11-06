import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';

declare var $: any ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  close(){
    $('#login').modal('close');
  }

  ngOnInit() {
    $(document).ready(function(){
      $('#login').modal();
    });
  }

}
