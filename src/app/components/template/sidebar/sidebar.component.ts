import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatDrawer, MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatToolbarModule, 
            MatDrawer, MatDrawerContent, MatNavList, MatListItem, RouterOutlet ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @ViewChild("drawer") public drawer!: MatDrawer;

  constructor(private sidebarService: SidebarService) {

  }
  ngOnInit(): void {
    this.sidebarService.sideNavToggleSubject.subscribe(
      () => {
        this.drawer?.toggle();
      }
    )
  }

}
