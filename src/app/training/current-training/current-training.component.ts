import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  public progress: number = 0;

  ngOnInit() {
    interval(1000).subscribe(() => this.progress += 5);
  }
}
