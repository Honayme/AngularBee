import {Component, OnInit} from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';


  constructor() {

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


    let registerLink = $('#modal-register'),
        loginLink = $('#modal-login');

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
    registerLink.on('click', function () {
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

    // Show up the login form when the user click on the register link
    loginLink.on('click', function () {
      if (registerBox.hasClass('active')) {
        registerBox.trigger('click');
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

      if (keycode === 27) {
        let overlay = $('.overlay');

        if (overlay.length && (materialContainer.find(':animated').addBack().length === 1)) {
          overlay.trigger('click');
        } else {
          setTimeout(function () {
            overlay.trigger('click');
          }, 400);
        }
      }
    });

    //TODO Maybe unify this
    // Add key event on "enter" when you login
    materialContainer.find('.box .input input').on('keydown', function (e) {
      let keyCode = e.which || e.keyCode;

      if (keyCode === 13) {
        materialContainer.find('.login button').trigger('click');
      }
    });
    // Add key event on "enter" when you register
    materialContainer.find('.overbox .input input').on('keydown', function (e) {
      let keyCode = e.which || e.keyCode;

      if (keyCode === 13) {
        materialContainer.find('.register button').trigger('click');
      }
    });

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
