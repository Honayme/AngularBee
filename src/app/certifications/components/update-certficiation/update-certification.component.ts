import {Component, Input, OnInit} from '@angular/core';
import {Certification} from '../../certification';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CertificationService} from '../../certification.service';

@Component({
  selector: 'app-update-certification',
  templateUrl: './update-certification.component.html',
  styleUrls: ['./update-certification.component.css']
})
export class UpdateCertificationComponent implements OnInit {
  @Input() certification: Certification;

  certificationForm: FormGroup;
  Certification: Certification;

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

    const id = this.certification.id;
    this.Certification = new Certification('', '', '', '', '', '', '', '', '', '', '', '', '');

    if (id) {
      this.certificationService.getDetail(id).subscribe((certification: Certification) => {
        this.Certification.id = certification.id;

        this.certificationForm.patchValue({
          title: certification.title,
          editor: certification.editor,
          expertiseField: certification.expertiseField,
          desc: certification.desc,
          validity: certification.validity,
          costHt: certification.costHt,
          costTtc: certification.costTtc,
          examDetail: certification.examDetail,
          examDuration: certification.examDuration,
          examNumber: certification.examNumber,
          howToSubscribe: certification.howToSubscribe,
          usefulInfos: certification.usefulInfos,
        });
      });

      console.log(this.Certification);
    }
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

  update() {
    this.Certification = Object.assign(this.Certification, this.certificationForm.value);

    this.certificationService.updateCertification(this.Certification).subscribe(certification => {
        console.log(certification);
      location.reload();
      console.log('update');
      });
  }
}
