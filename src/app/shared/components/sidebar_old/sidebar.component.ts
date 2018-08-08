import { Component, OnInit } from '@angular/core';
import {SidebarService} from './sidebar.service';

@Component({
  selector: 'ns-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu_open: boolean;

  groups = {
    admin: {
      expanded: true
    }
  };

  constructor(private sidebarSvc: SidebarService) {
  }

  expandGroup(group) {
    this.groups[group].expanded = !this.groups[group].expanded;
  }

  ngOnInit() {
    this.sidebarSvc.toggleMenu(true);
    this.sidebarSvc.menuMinified.subscribe(state => this.menu_open = state);
  }

}
