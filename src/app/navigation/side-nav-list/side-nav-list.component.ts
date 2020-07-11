import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent {
  @Output() private closeSidenav: EventEmitter<void> = new EventEmitter<void>();
  
  public onClose(): void {
    this.closeSidenav.emit();
  }
}
