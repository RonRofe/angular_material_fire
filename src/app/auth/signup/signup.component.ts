import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public maxDate: Date;
  public isLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.subscriptions.push(
      // this.uiService.loadingState$.subscribe((state: boolean) => this.isLoading = state),
      this.store.select(fromRoot.getIsLoading).subscribe((state: boolean) => this.isLoading = state),
    );
  }

  ngOnDestroy() {
    for(const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  public onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
