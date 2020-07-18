import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../traning.service';

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
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }
  
  private startOrResumeTimer(): void {
    const step: number = this.trainingService.getRunningExercise().duration / 100 * 1000;
    
    this.proIntSubscription = interval(step).pipe(
      takeWhile(() => this.progress < 100),
    ).subscribe(
      () => this.progress++,
      null,
      () => this.trainingService.complete(),
    );
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
