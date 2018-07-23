import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertsService} from '../../midpoint/alerts/alerts.service';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private alertsService: AlertsService) { }

  ngOnInit() {
    // this.alertsService.alertInfo({title: 'RESOURCE_LOADED', body: 'Codes were loaded successfully'}, 5000);
  }

}
