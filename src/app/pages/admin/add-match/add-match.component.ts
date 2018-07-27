import { Component, OnInit } from '@angular/core';
import {MomentModule} from 'angular2-moment';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../../../midpoint/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {getUrl} from '../../../midpoint/helpers/endpoint.helper';

@Component({
  selector: 'ns-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {
  public Date: any;
  public addMatchForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    this.Date = new Date(day, month, year);
    console.log();

    this.addMatchForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
      info: new FormControl(null)
    });
  }

  get name() { return this.addMatchForm.get('name'); }
  get date() { return this.addMatchForm.get('date'); }
  get place() { return this.addMatchForm.get('place'); }
  get info() { return this.addMatchForm.get('info'); }

  ngOnInit() {
  }

  onSubmit(form) {
    this.http.post(getUrl('ADD_MACTH'), form).subscribe(res => {
      console.log(res);
    }, err => console.log(err));
    // const value = "LOOOL";
    // if(form) {
    //   // let header = new Headers({'Access-Control-Allow-Origin': 'Content-Type'});
    //   this.http.post(getUrl('ADD_MACTH'), value).subscribe((response) => {
    //     console.log(response);
    //   }, error => console.log(error))
    // } else {
    //   console.log('not valid');
    // }
  }

}
