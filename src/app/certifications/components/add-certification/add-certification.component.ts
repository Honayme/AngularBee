import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Certification} from '../../certification';
import {ActivatedRoute, Router} from '@angular/router';
import {CertificationService} from '../../certification.service';

@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrls: ['./add-certification.component.css']
})
export class AddCertificationComponent implements OnInit {

  certificationForm: FormGroup;
  Certification: Certification;
  update = false;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private certificationService: CertificationService,
              private router: Router) {}


  ngOnInit(): void {
    this.certificationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      editor: ['', [Validators.required, Validators.maxLength(500)]],
      expertiseField: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      validity: ['', [Validators.required]],
      costHt: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      costTtc: ['', [Validators.required]],
      examDetail: ['', [Validators.required]],
      examDuration: ['', [Validators.required]],
      examNumber: ['', [Validators.required]],
    });
  }

}
