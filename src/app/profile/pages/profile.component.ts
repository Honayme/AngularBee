import { Component, OnInit } from '@angular/core';
import {Users} from '../users';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../profile.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Users;

  constructor(private route:ActivatedRoute,
              private profileService: ProfileService,
              public sanitize: DomSanitizer,
              private router: Router) { }

  ngOnInit() {
    this.profileService.getProfile().toPromise().then(profile => {
      this.profile = profile;
      console.log(profile);
    });
  }

}
