import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as fromTraining from '../training.reducer';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../traning.service';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  public progress: number = 0;

  private proIntSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer(): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise: Exercise) => {
      const step: number = exercise.duration / 100 * 1000;

      this.proIntSubscription = interval(step).pipe(
        takeWhile(() => this.progress < 100),
      ).subscribe(
        () => this.progress++,
        null,
        () => this.trainingService.complete(),
      );
    });
  }

  public onStop(): void {
    this.proIntSubscription.unsubscribe();

    const dialogRef: MatDialogRef<StopTrainingComponent> = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.trainingService.cancel(this.progress);
        return;
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
