import {Component, Input, OnInit} from '@angular/core';
import {CertificationService} from '../../certification.service';
import {Certification} from '../../certification';
declare var $: any;

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css'],
})
export class CertificationsComponent implements OnInit {

  constructor(private certificationService: CertificationService) { }

  certifications: any[];
  ngOnInit() {

    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $('#modal-add-certification').modal();

    this.certificationService.getAll().subscribe(certifications => {
      this.certifications = certifications;
      console.log(this.certifications);
    });
  }

  public openModalAdd() {
    $('#modal-add-certification').modal('open');
  }
}
