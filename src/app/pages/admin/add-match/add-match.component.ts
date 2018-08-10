import { Component, OnInit } from '@angular/core';
import {MomentModule} from 'angular2-moment';
import {AlertsService} from '../../../midpoint/alerts/alerts.service';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../../../midpoint/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {getUrl} from '../../../midpoint/helpers/endpoint.helper';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ns-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {
  public today: any;
  public addMatchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private alertsService: AlertsService,
    private router: Router) {

    this.today = moment().format('DD-MM-YYYY'); // add this 2 of 4
    // console.log('hello world', now.format("dd.MM.YYYY")); // add this 3 of 4
    console.log(this.today);


    this.addMatchForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      place: new FormControl(null),
      info: new FormControl(null)
    });

  }

  get name() { return this.addMatchForm.get('name'); }
  get date() { return this.addMatchForm.get('date'); }
  get time() { return this.addMatchForm.get('time'); }
  get place() { return this.addMatchForm.get('place'); }
  get info() { return this.addMatchForm.get('info'); }

  ngOnInit() {
  }

  onSubmit(form) {
    if (!this.addMatchForm.valid) {
      this.name.markAsTouched();
      this.date.markAsTouched();
      this.time.markAsTouched();
      this.date.markAsTouched();

    } else {
      this.http.post(getUrl('ADD_MATCH'), form).subscribe(res => {
        console.log(form)
        console.log(res);
        this.alertsService.alertSuccess({title: 'Match added', body: 'Match was successfully saved'}, 2500);
        this.router.navigate(['/admin']);
      }, err => console.log(err));
    }
  }

}
