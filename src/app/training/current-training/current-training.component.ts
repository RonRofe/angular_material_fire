import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training.component';

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
  ) {}

  ngOnInit() {
    this.proIntSubscription = interval(1000).pipe(
      takeWhile(() => this.progress < 100),
    ).subscribe(() => this.progress += 5);
  }
  
  public onStop(): void {
    this.proIntSubscription.unsubscribe();

    const dialogRef: MatDialogRef<StopTrainingComponent> = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } });

    dialogRef.afterClosed().subscribe((result: boolean) => console.log(result));
  }
}
