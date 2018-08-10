import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './dashboard.routing';
import { MatchesComponent } from './matches/matches.component';
import { SecNavbarTopComponent } from './sections/sec-navbar-top/sec-navbar-top.component';
import { SecMatchTileComponent } from './sections/sec-match-tile/sec-match-tile.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardInterfaceComponent } from './dashboard-interface/dashboard-interface.component';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    routing,
    NgxDatatableModule
  ],
  declarations: [MatchesComponent, SecNavbarTopComponent, SecMatchTileComponent, DashboardInterfaceComponent],
  exports: [SecNavbarTopComponent, SecMatchTileComponent, MatchesComponent, DashboardInterfaceComponent]
})
export class DashboardModule { }
