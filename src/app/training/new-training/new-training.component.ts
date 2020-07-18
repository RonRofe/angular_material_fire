import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../traning.service';

import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  public exercises: Exercise[] = [];

  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  public onStartTraning(form: NgForm): void {
    this.trainingService.start(form.value.exercise);
  }
}
