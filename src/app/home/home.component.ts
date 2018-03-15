import { Component, OnInit } from '@angular/core';
declare var $ : any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    let nav = $('nav'),
        footer = $('footer');

    nav.removeClass('layout-drawer-is-open');
    footer.removeClass('layout-drawer-is-open');


  }

}
