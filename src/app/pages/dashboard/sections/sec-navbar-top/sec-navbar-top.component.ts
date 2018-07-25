import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sec-navbar-top',
  templateUrl : './sec-navbar-top.component.html',
  styleUrls: ['./sec-navbar-top.component.scss']
})
export class SecNavbarTopComponent implements OnInit {

  public dropdownActive: boolean;

  constructor() { }

  ngOnInit() {
  }

}
