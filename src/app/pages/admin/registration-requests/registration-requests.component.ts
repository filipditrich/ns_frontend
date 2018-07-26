import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getUrl} from '../../../base/helpers/endpoint.helper';
import {DialogsService} from '../../../base/dialogs/dialogs.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ns-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.scss']
})
export class RegistrationRequestsComponent implements OnInit {

  public rows = [];
  public temp = [];
  public columns = [
    { name: 'Email' },
    { name: 'Name' },
    { name: 'Requested On', prop: 'requestedOn' },
    { name: 'Approved', prop: 'approval.approved' },
    { name: 'Registered', prop: 'registration.userRegistered' }
  ];

  public inviteOneForm: FormGroup;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private http: HttpClient,
              private dialogService: DialogsService) {
    this.http.get<any>(getUrl('LIST_REQS')).subscribe(response => {
      console.log(response);

      if (response.requests) {
        this.rows = response.requests;
        this.temp = [...response.requests];
      }

    }, error => {
      console.log(error);
    });


    this.inviteOneForm = new FormGroup({
      email: new FormControl(null, [ Validators.email, Validators.required ])
    });

  }

  get oneEmail() { return this.inviteOneForm.get('email'); }

  ngOnInit() {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
