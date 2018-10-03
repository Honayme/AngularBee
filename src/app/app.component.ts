import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

declare var $: any ;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';


  constructor(public authService: AuthService) {

  }

  ngOnInit(){

    let nav = $('nav'),
      footer = $('footer'),
      arrow = $('#toggle-arrow');

    // if(nav.hasClass("layout-drawer-is-close")){
    //   alert("salut les gros pd");
    // }
    nav.addClass("layout-drawer-is-close");
    footer.addClass("layout-drawer-is-close");
    // arrow.addClass("hide");
    // nav.removeClass("layout-drawer-is-open");
    // footer.removeClass("layout-drawer-is-open");


    let materialContainer = $('.materialContainer'),
        registerBox = materialContainer.find('.material-button-register'),
        shapeElement = materialContainer.find('.shape');

    //Add underline on hover
    nav.find('ul:not(.side-nav) li:not(.active)').hover(function () {
      $(this).addClass('active');
    }, function () {
      $(this).removeClass('active');
    });

    // Show up the register form when the user click on the register link
    $('#modal-register').on('click', function () {
      $('.materialContainer').find('.shape').trigger('click');
      if (!registerBox.hasClass('active')) {
        let overlayId = $(this).attr('data-overlay'),
            overlay = $('#' + overlayId),
            top = window.scrollY + 480 + 'px';

        if (!overlay.length) {
          createOverlay(overlayId).fadeIn(300);
        }

        shapeElement.trigger('click');
        $('.materialContainer').css('top', top).fadeIn(300);
      }

      if (shapeElement.hasClass('active')) {
        shapeElement.removeClass('active').css({
          "width": "100%",
          "height": "100%",
          "transform": "inherit"
        });
      }
    });

    // Show up the login form when the user click on the login link
    $('#modal-login').on('click', function () {

      if ($('.materialContainer').find('.material-button-register').hasClass('active')) {
        $('.materialContainer').find('.material-button-register').trigger('click');
      } else {
        let overlayId = $(this).attr('data-overlay'),
          overlay = $('#' + overlayId),
          top = window.scrollY + 480 + 'px';

        if (!overlay.length) {
          createOverlay(overlayId).fadeIn(300);
        }

        $('.materialContainer').css('top', top).fadeIn(300);
      }

      if (shapeElement.hasClass('active')) {
        shapeElement.removeClass('active').css({
          "width": "100%",
          "height": "100%",
          "transform": "inherit"
        });
      }
    });


    function createOverlay(id) {
      let overlay = $('<div id="' + id + '" class="overlay black"></div>');

      overlay.on('click', function () {
        let buttonRegister = materialContainer.find('.material-button-register');

        $(this).remove();
        $('[data-' + id + ']').fadeOut();

        setTimeout(function () {
          $('.materialContainer-check').fadeOut(300);

          if (buttonRegister.hasClass('active')) {
            buttonRegister.find('.shape').trigger('click');
          }

          $('.button button, .alt-2').removeClass('active');
          $('.click-effect').remove();

          $('.materialContainer-action').fadeIn(300);
          $(document.body).removeClass('no-scroll');
        }, 300);
      });

      $(document.body).addClass('no-scroll').append(overlay);

      return overlay;
    }

    // Detect "esc" key pressed
    $(document).on('keydown', function (e) {
      let keycode = e.which || e.keyCode;
      let overlay = $('.overlay');

      if (keycode === 27) {
        if (overlay.length && (materialContainer.find(':animated').addBack().length === 1)) {
          overlay.trigger('click');
        } else {
          setTimeout(function () {
            overlay.trigger('click');
          }, 400);
        }
      }

      if (keycode === 13) {
        if (overlay.length && (materialContainer.find(':animated').addBack().length === 1)) {
          if ( $('.materialContainer').find('#buttonlogin').prop('disable') === false){
            $('.materialContainer').find('#buttonlogin').trigger('click');
          }
        } else {
          setTimeout(function () {
            $('.materialContainer').find('#buttonlogin').trigger('click');
          }, 400);
        }
      }

      if (keycode === 13) {
        if (overlay.length && (materialContainer.find(':animated').addBack().length === 1)) {
          $('.materialContainer').find('#buttonregister').trigger('click');
        } else {
          setTimeout(function () {
            $('.materialContainer').find('#buttonregister').trigger('click');
          }, 400);
        }
      }

    });//KeyDown


    // Avoid all links with "#" to send user to the top of the page
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });
    // Taking account about dynamic elements created on the fly
    $('body').on('click', 'a[href="#"]', function (e) {
      e.preventDefault();
    });



    /* Fixes */

    // Fix materialize issue : when the drag target is showned up and the user resize, there is no body resize
    $(window).on('resize', function () {
      let navOverlay = $('[data-sidenav="mobile-demo"]');

      if (navOverlay) {
        $(document.body).css('width', 'auto');
      }
    });
  }

}
