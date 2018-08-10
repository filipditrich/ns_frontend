import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sec-match-tile',
  templateUrl: './sec-match-tile.component.html',
  styleUrls: ['./sec-match-tile.component.scss']
})
export class SecMatchTileComponent implements OnInit {

  constructor(private http: HttpClient) {
    // this.http
  }

  ngOnInit() {
  }

}
