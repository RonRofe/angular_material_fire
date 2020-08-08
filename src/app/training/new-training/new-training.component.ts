import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from '../traning.service';

import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public exercises: Exercise[];

  private subscriptions: Subscription[] = [];

  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.trainingService.getExercisesChangedListener().subscribe((exs: Exercise[]) => this.exercises = exs),
    );

    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  public onStartTraning(form: NgForm): void {
    this.trainingService.start(form.value.exercise);
  }
}
