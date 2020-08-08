import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import { TrainingService } from '../traning.service';

import { Exercise } from 'src/app/models/exercise.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  public exercises$: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.exercises$ = this.db.collection('available_exercises').valueChanges();
  }

  public onStartTraning(form: NgForm): void {
    this.trainingService.start(form.value.exercise);
  }
}
