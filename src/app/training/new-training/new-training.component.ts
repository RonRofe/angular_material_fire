import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from '../traning.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  public exercises$: Observable<Exercise[]>;
  public isLoading$: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.trainingService.fetchAvailableExercises();
  }

  public onStartTraning(form: NgForm): void {
    this.trainingService.start(form.value.exercise);
  }
}
