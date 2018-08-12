import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {IMatch} from '../../../core/models/match.interface';
import {MatchManagerService} from './match-manager.service';
import {ErrorHelper} from '../../../core/helpers/error.helper';
import {FormControl, FormGroup} from '@angular/forms';
import {DialogsService} from '../../../core/services/dialogs/dialogs.service';


@Component({
  selector: 'ns-match-manager',
  templateUrl: './match-manager.component.html',
  styleUrls: ['./match-manager.component.scss']
})
export class MatchManagerComponent implements OnInit {

  public mobile: boolean;
  public rows: IMatch[] = [];
  public temp = [];
  public form: FormGroup;

  @ViewChild('myTable') table: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobile = event.target.innerWidth <= 768;
  }

  constructor(private matchManagerSvc: MatchManagerService,
              private errorHelper: ErrorHelper,
              private dialogsService: DialogsService) {

    this.loadMatches();

    this.form = new FormGroup({
      filterBy: new FormControl(null),
      search: new FormControl(null)
    });

  }

  get filterBy() { return this.form.get('filterBy'); }
  get search() { return this.form.get('search'); }

  ngOnInit() {
    this.mobile = window.innerWidth <= 768;
    this.filterBy.setValue('title', { onlySelf: true });
  }

  matchDate(date) {
    return moment(new Date(date));
  }

  deleteUser(id) {
    this.dialogsService.dialogDanger({
      title: 'Are you sure?',
      body: 'Do you really want to delete this match?',
      buttons: [
        {
          class: 'btn-cancel',
          text: 'Cancel',
          action: 'close'
        },
        {
          class: 'btn-danger',
          text: 'Delete',
          action: () => this.removeMatch(id)
        }
      ]
    });
  }

  removeMatch(id) {
    // TODO
    console.log(id);
  }

  loadMatches() {
    this.matchManagerSvc.listMatches().subscribe(response => {
      if (response.output) {
        response.output.forEach(match => {
          match.date = moment(match.date).format('lll');
          // match.place = match
        });
        this.rows = response.output;
        this.temp = [...response.output];
      } else {
        this.errorHelper.processedButFailed(response);
      }
    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

  onSort(event) {
  }

  onPage(event) {
    this.loadMatches();
  }

  rowClass(row) {
    return {
      'muted' : !!row
    };
  }

  updateFilter() {
    const val = this.search.value;
    const filterBy = this.filterBy.value || 'title';
    this.rows = this.temp.filter(function(d) {
      return d[filterBy].toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
