import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  public progress: number = 0;

  private proIntSubscription: Subscription;

  ngOnInit() {
    this.proIntSubscription = interval(1000).pipe(
      takeWhile(() => this.progress < 100),
    ).subscribe(() => this.progress += 5);
  }
  
  public onStop(): void {
    this.proIntSubscription.unsubscribe();
  }
}
