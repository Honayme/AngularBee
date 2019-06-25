import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainingService} from '../../training.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Training} from '../../training';

declare var $: any;

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {

  trainingForm: FormGroup;
  Training: Training;
  update = false;
  picture = '';

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private trainingService: TrainingService,
              private router: Router,
              public sanitize: DomSanitizer) { }

  ngOnInit(): void {
    this.trainingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      place: ['', [Validators.required]],
      totalSeat: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      picture: ['', [Validators.required]],
      theme: ['', [Validators.required]],
    });

    const id = this.route.snapshot.params['id'];
    this.Training = new Training('', '', '', '', '', '', '', '', '', '', '');

    if (id) {
      this.update = true;
      this.trainingService.getDetail(id).subscribe((training:any) =>{
        this.Training.id = training[0].id;
        this.picture = training[0].picture;

        this.trainingForm.patchValue({
          name: training[0].name,
          description: training[0].description,
          duration: training[0].duration,
          date: training[0].date,
          hour: training[0].hour,
          place: training[0].place,
          totalSeat: training[0].totalSeat,
          availableSeat: training[0].totalSeat,
          picture: training[0].picture,
          theme: training[0].theme,
        });
      });
    }
}

populateTestData(): void {
    this.trainingForm.setValue({
      name: 'NodeJs & Angular',
      description: 'Une formation qui vous permettra de saisir l\'essentiel de la stack Node et Angular',
      duration: '4h',
      date: '10/10/2018',
      hour: '17:45:00',
      place: 'Ynov Aix en Provence',
      totalSeat: '20',
      theme: 'Développement'
    });
}

save() {
    this.Training = Object.assign(this.Training, this.trainingForm.value);
    this.Training.picture = this.picture;
    if (this.update !== true) {
      this.trainingService.createTraining(this.Training).subscribe(Training => {
        this.router.navigate(['/formations']);
        console.log('create');
      });
    } else {
      this.trainingService.updateTraining(this.Training).subscribe(Training => {
        this.router.navigate(['/formations']);
        console.log('update');
      });
    }
}

changeListener($event): void {
    this.readThis($event.target);
}

readThis(inputValue: any): void {
    const file: File = inputValue.files[0],
          myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.picture = myReader.result as string;
    };
    myReader.readAsDataURL(file);
}

}
