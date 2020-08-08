import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { TrainingService } from '../traning.service';

import { Exercise } from 'src/app/models/exercise.model';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();

  private subscriptions: Subscription[] = [];

  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() { 
    this.subscriptions.push(
      this.trainingService.getFinishedExsListener().pipe(
        map((exs: any[]) => {
          return exs.map((ex: any) => {
            return {
              ...ex,
              date: new Date(ex.date.seconds * 1000),
            };
          });
        }),
      ).subscribe((exs: Exercise[]) => this.dataSource.data = exs),
    );
    this.trainingService.fetchPastExercises();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  public doFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
