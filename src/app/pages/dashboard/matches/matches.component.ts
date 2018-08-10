import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {getUrl} from '../../../midpoint/helpers/endpoint.helper';
import {s} from '@angular/core/src/render3';


@Component({
  selector: 'ns-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  public responseBody: any;
  public user: any;
  public answeredParticipation: boolean;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.http.post(getUrl('GET_MATCHES'), {}).subscribe(res => {
      this.responseBody = res;
      this.responseBody = this.responseBody.request;
    }, err => {
      console.log('Error: ' + err);
    });
  }

  ngOnInit() {
  }

  checkAdmin() {
    const roles = this.user.roles;
    if (this.user && roles.indexOf('admin') >= 0) {
      return true;
    } else {
      return false;
    }
  }

  checkPlayer() {
    const roles = this.user.roles;
    if (this.user && roles.indexOf('player') >= 0) {
      return true;
    } else {
      return false;
    }
  }

  deleteMatch(selectedMatch) {
    console.log(getUrl('DELETE_MATCH'));
    this.http.post(getUrl('DELETE_MATCH'), selectedMatch._id).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('Error: ' + JSON.stringify(err));
    });
  }

  participation(status) {
    this.answeredParticipation = true;
    if (status === 'yes') {
      this.http.post(getUrl('PARTICIPATION'), status).subscribe(res => {
        console.log(res);
      }, err => {
        console.log('Error: ' + JSON.stringify(err));
      });
    }
  }

  willParticipate(match) {
    if (match.players.indexOf(this.user._id) >= 0) {
      return true;
    } else {
      return false;
    }
  }

}
