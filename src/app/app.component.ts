import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

declare var $: any ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {

    $(document).ready(function() {
      $('.sidenav').sidenav();
    });

    const navSelector  = $('#main-nav li');

    $(document).on('click', '#main-nav li', function() {
      navSelector.removeClass('active');
      $(this).addClass('active');
    });

    navSelector.hover(function () {
      navSelector.removeClass('active');
      $(this).addClass('active');
    });
  }
}
