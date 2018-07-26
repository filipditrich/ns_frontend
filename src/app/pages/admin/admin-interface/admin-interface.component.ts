import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})
export class AdminInterfaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkAdmin() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let roles = user.roles;
    if(user && roles.indexOf('admin')>0) {
      return true;
    } else {
      return false;
    }
  }

}
