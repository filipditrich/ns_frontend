import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {ErrorHelper} from '../../../core/helpers/error.helper';
import {AlertsService} from '../../../core/services/alerts/alerts.service';
import {SidebarService} from '../sidebar/sidebar.service';
import {IUser} from '../../../core/models/user.interface';

@Component({
  selector: 'ns-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public dropdownOpen = false;
  public user: IUser;
  menu_open: boolean;

  constructor(private router: Router,
              private errorHelper: ErrorHelper,
              private alertsService: AlertsService,
              private sidebarSvc: SidebarService) { }

  ngOnInit() {
    this.sidebarSvc.menuMinified.subscribe(state => this.menu_open = state);
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  expandMenu() {
    this.sidebarSvc.toggleMenu(!this.menu_open);
  }

}
