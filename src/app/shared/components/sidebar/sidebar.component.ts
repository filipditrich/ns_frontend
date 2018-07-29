import { Component, OnInit } from '@angular/core';
import {SidebarService} from './sidebar.service';

@Component({
  selector: 'ns-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  minified: boolean;

  constructor(private sidebarSvc: SidebarService) {
  }

  ngOnInit() {
    this.sidebarSvc.toggleMenu(true);
    this.sidebarSvc.menuMinified.subscribe(state => this.minified = state);
  }

}
