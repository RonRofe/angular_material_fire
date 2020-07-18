import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit {
  @Output() private closeSidenav: EventEmitter<void> = new EventEmitter<void>();
  
  public isAuth: boolean;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.getAuthChangeListener().subscribe((status: boolean) => {
      this.isAuth = status;
    });
  }

  public onClose(): void {
    this.closeSidenav.emit();
  }
}
