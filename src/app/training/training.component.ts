import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './traning.service';

import { Exercise } from '../models/exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public ongoingTrainings: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.trainingService.getExerciseListener().subscribe(
        (ex: Exercise) => this.ongoingTrainings = !!ex,
      ),
    );
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
