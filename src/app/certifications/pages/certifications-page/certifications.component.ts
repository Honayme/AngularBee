import {Component, OnInit, ViewEncapsulation} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css'],
})
export class CertificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  public openModalAdd() {
    $('#modal-add-certification').modal('open');
  }

}
