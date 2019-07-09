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
  @Input() certification: Certification;

  constructor(private route: ActivatedRoute,
              public certificationService: CertificationService) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $('#modal-update-certification').modal();

  }

  public openModalUpdate() {
    $('#modal-update-certification').modal('open');
  }

  delete(idCertification) {
    this.certificationService.deleteCertification(idCertification).subscribe( certification => {
      console.log(certification);
      location.reload();
      console.log('training has been deleted');
    });
  }
}
