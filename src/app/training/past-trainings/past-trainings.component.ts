import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { TrainingService } from '../traning.service';

import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) private sort: MatSort;

  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
