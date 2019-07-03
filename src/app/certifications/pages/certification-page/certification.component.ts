import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() certifications: Certification[];
  @Output() certificationsChange = new EventEmitter<Certification[]>();

  idCertification = this.route.snapshot.params['id'];
  certificationDetail: Certification;

  constructor(private route: ActivatedRoute,
              public certificationService: CertificationService) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

      this.certificationService.getDetail((this.idCertification)).subscribe(certification => {
            console.log('Ma certification' + certification);
            this.certificationDetail = certification;
        });
  }

  delete(idCertification) {
    this.certificationService.deleteCertification(idCertification).subscribe( certification => {
      this.certifications = [...this.certifications, certification];
      this.certificationsChange.emit(this.certifications);
      console.log('training has been deleted');
    });
  }
}
