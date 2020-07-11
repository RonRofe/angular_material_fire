import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent {
  @Output() private trainingStart: EventEmitter<void> = new EventEmitter<void>();

  public onStartTraning(): void {
    this.trainingStart.emit();
  }
}
