import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sec-navbar-top',
  templateUrl : './sec-navbar-top.component.html',
  styleUrls: ['./sec-navbar-top.component.scss']
})
export class SecNavbarTopComponent implements OnInit {

  public dropdownActive: boolean;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout() {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
    }
  }

}
