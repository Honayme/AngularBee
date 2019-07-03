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
  @Input() certification: Certification;
  @Input() certifications: Certification[];
  @Output() certificationsChange = new EventEmitter<Certification[]>();

  constructor(private route: ActivatedRoute,
              public certificationService: CertificationService) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });

    $('#modal-add-certification').modal();

  }

  public openModalAdd() {
    $('#modal-add-certification').modal('open');
  }

  delete(idCertification) {
    this.certificationService.deleteCertification(idCertification).subscribe( certification => {
      // this.certifications = [...this.certifications, certification];
      // this.certificationsChange.emit(this.certifications);
      console.log('training has been deleted');
    });
  }
}
