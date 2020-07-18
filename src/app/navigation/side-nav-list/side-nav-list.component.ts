import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit, OnDestroy {
  @Output() private closeSidenav: EventEmitter<void> = new EventEmitter<void>();
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

  public onClose(): void {
    this.closeSidenav.emit();
  }

  public onLogout(): void {
    this.onClose();
    this.authService.logout();
  }
}
