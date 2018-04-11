import {Component, OnInit, ViewEncapsulation} from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CertificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    //TODO Refaire cette fonctionnalité avec un click et un rajout de classe

    let toggleDrawer = $('.toggle-drawer'),
        drawerBackdrop = $('.drawer-backdrop'),
        drawer = $('#search-drawer'),
        // main = $('#main'),
        nav = $('nav'),
        footer = $('footer');

    // main.toggleClass('layout-drawer-is-open');
    if(nav.hasClass('layout-drawer-is-open') && footer.hasClass('layout-drawer-is-open')){

    }else{
      nav.toggleClass('layout-drawer-is-open');
      footer.toggleClass('layout-drawer-is-open');
    }
    // closeDrawer();

    // Toggle drawer on click icon
   //  toggleDrawer.on('click', function () {
   //
   //    closeDrawer();
   //    changeChevron();
   //
   //    // if (drawer.hasClass('drawer-is-open') && drawerBackdrop.filter(':visible').addBack()) {
   //    //   drawerBackdrop.fadeIn(300);
   //    // }
   //
   // });

    function activeToggle(){
      closeDrawer();
      changeChevron();
    }
    // Toggle the drawer and fade the backdrop on his click
    drawerBackdrop.on('click', function () {
      alert('drawerbackdrop');
      // closeDrawer();
      $(this).fadeOut(300);
    });

    //Changer le chevron une fois le toggle activé
    function changeChevron(){
      let content = $(this).find('i').html();
      if (content === 'chevron_right') {
        $(this).find('i').html('chevron_left');
      } else {
        $(this).find('i').html('chevron_right');
      }
    }


    function closeDrawer () {
      alert("je suis dans le close drawer");
      let main = $('#main'),
          nav = $('nav'),
          footer = $('footer');

      main.toggleClass('layout-drawer-is-open');
      nav.toggleClass('layout-drawer-is-open');
      footer.toggleClass('layout-drawer-is-open');
      drawer.toggleClass('drawer-is-open');
    }
  }

}
