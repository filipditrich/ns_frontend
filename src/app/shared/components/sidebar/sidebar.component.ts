import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { IMenuGroup } from '../../../core/models/menulinks.interface';
import { groups } from './sidebar.links';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'ns-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu_open: boolean;
  groups: IMenuGroup[];

  constructor(private sidebarSvc: SidebarService,
              private router: Router) {
  }

  toggleMenu() {
    this.sidebarSvc.toggleMenu(!this.menu_open);
  }

  ngOnInit() {
    this.sidebarSvc.menuMinified.subscribe(state => this.menu_open = state);

    this.setNavigationLinks();
    this.sidebarSvc.toggleMenu(false);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setNavigationLinks();
        this.sidebarSvc.toggleMenu(false);
      }
    });
  }

  setNavigationLinks() {
    const _roles = JSON.parse(sessionStorage.getItem('user')).roles;
    const _url = this.router.url;

    // filter links so that the user can see links that
    // he is supposed to be able to access
    this.groups = groups.filter(
      group => group.children.some(
        child => child.roles.some(
          role => _roles.includes(role))));

    // set active class
    this.groups.forEach(group => {
      group.children.forEach(child => {
        child.active = child.path === _url;
      });
    });
  }

}
