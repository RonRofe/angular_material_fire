import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() private sideNavToggle: EventEmitter<void> = new EventEmitter<void>();
  private subscriptions: Subscription[] = [];

  public isAuth: boolean;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.getAuthChangeListener().subscribe((status: boolean) => {
        this.isAuth = status;
      }),
    );
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  public onToggleSidenav(): void {
    this.sideNavToggle.emit();
  }
}
