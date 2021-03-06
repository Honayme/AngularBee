import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Certification} from '../../certification';
import {ActivatedRoute} from '@angular/router';
import {CertificationService} from '../../certification.service';
declare var $: any;


@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrls: ['./add-certification.component.css']
})
export class AddCertificationComponent implements OnInit {
  @Input() certifications: Certification[];
  @Output() certificationsChange = new EventEmitter<Certification[]>();

  certificationForm: FormGroup;
  Certification: Certification;
  update = false;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private certificationService: CertificationService) {
  }


  ngOnInit(): void {
    this.certificationForm = this.fb.group({
      title: ['', [Validators.required]],
      editor: ['', [Validators.required]],
      expertiseField: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      validity: ['', [Validators.required]],
      costHt: ['', [Validators.required]],
      costTtc: ['', [Validators.required]],
      examDetail: ['', [Validators.required]],
      examDuration: ['', [Validators.required]],
      examNumber: ['', [Validators.required]],
      howToSubscribe: ['', [Validators.required]],
      usefulInfos: ['', [Validators.required]],
    });

    this.Certification = new Certification('', '', '', '', '', '', '', '', '', '', '', '', '');
  }

  populateTestData(): void {
    this.certificationForm.setValue({
      title: 'CEHHH',
      editor: 'CISCO',
      expertiseField: 'Ethical Hacking',
      desc: 'Become an ethical hacker',
      validity: '2 Years',
      costHt: '300',
      costTtc: '345',
      examDetail: 'QCM',
      examDuration: '2 Hours',
      examNumber: 'CEHV-47456',
      howToSubscribe: 'Pour s\'inscrire go to inscription.com',
      usefulInfos: 'Pas de calculatrice autorisée',
    });
  }

  save() {
    this.Certification = Object.assign(this.Certification, this.certificationForm.value);
    this.certificationService.createCertification(this.Certification).subscribe(certification => {
      this.certifications = [...this.certifications, certification];
      this.certificationsChange.emit(this.certifications);
      console.log('create');
    });
  }
}
