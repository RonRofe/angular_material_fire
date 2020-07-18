import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { TrainingService } from '../traning.service';

import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() private trainingStart: EventEmitter<void> = new EventEmitter<void>();
  
  public exercises: Exercise[] = [];

  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  public onStartTraning(): void {
    this.trainingStart.emit();
  }
}
