import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

  checkAdmin() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let roles = user.roles;
    if(roles.indexOf('admin')>0) {
      return true;
    } else {
      return false;
    }
  }

}
