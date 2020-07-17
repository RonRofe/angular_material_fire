import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() private sideNavToggle: EventEmitter<void> = new EventEmitter<void >();

  public isAuth: boolean;

  constructor(
    private authService: AuthService,
  ) {}
  
  ngOnInit() {
    this.authService.getAuthChangeListener().subscribe((status: boolean) => {
      this.isAuth = status;
    });
  }

  public onToggleSidenav(): void {
    this.sideNavToggle.emit();
  }
}
