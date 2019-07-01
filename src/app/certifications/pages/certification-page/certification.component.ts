import {Component, Input, OnInit} from '@angular/core';
import {CertificationService} from '../../certification.service';
import {ActivatedRoute} from '@angular/router';
import {Certification} from '../../certification';
declare var $: any;

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  @Input() certification: CertificationService;

  idCertification = this.route.snapshot.params['id'];
  certificationDetail = [];

  constructor(private route: ActivatedRoute,
              public certificationService: CertificationService) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    this.certificationService.getDetail((this.idCertification)).toPromise().then(certification => {
      this.certificationDetail = certification;
    });
  }

}
