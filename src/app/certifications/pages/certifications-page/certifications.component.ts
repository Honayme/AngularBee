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

    $('#modal-add-certification').modal();

  }

  public openModalAdd(){
    $('#modal-add-certification').modal('open');
  }
}
