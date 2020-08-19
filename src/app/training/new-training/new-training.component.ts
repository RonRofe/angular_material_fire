import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from '../traning.service';
import * as fromRoot from '../../app.reducer';

import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public exercises: Exercise[];
  public isLoading$: Observable<boolean>

  private subscriptions: Subscription[] = [];

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.trainingService.getExercisesChangedListener().subscribe((exs: Exercise[]) => {
        this.exercises = exs;
      }),
    );

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

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
