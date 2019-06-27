import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Certification} from '../../certification';
import {ActivatedRoute, Router} from '@angular/router';
import {CertificationService} from '../../certification.service';
import {Training} from '../../../trainings/training';

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
              private router: Router) {
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

    const id = this.route.snapshot.params['id'];
    this.Certification = new Certification('', '', '', '', '', '', '', '', '', '', '', '', '', '');
    if (id) {
      this.update = true;
      this.certificationService.getDetail(id).subscribe((certification: any) => {
        this.Certification.id = certification[0].id;

        this.certificationForm.patchValue({
          title: certification[0].title,
          editor: certification[0].editor,
          expertiseField: certification[0].expertiseField,
          desc: certification[0].desc,
          validity: certification[0].validity,
          costHt: certification[0].costHt,
          costTtc: certification[0].costTtc,
          examDetail: certification[0].examDetail,
          examDuration: certification[0].examDuration,
          examNumber: certification[0].examNumber,
          howToSubscribe: certification[0].howToSubscribe,
          usefulInfos: certification[0].usefulInfos,
        });
      });
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


  save() {
    this.Certification = Object.assign(this.Certification, this.certificationForm.value);
    if (this.update !== true) {
      this.certificationService.createCertification(this.Certification).subscribe(Certification => {
        this.router.navigate(['/certifications']);
        console.log('create');
      });
    } else {
      this.certificationService.updateCertification(this.Certification).subscribe(Certification => {
        this.router.navigate(['/certifications']);
        console.log('update');
      });
    }
  }
}
