import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() private sideNavToggle: EventEmitter<void> = new EventEmitter<void >();

  public onToggleSidenav(): void {
    this.sideNavToggle.emit();
  }
}
