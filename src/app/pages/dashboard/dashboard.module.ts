import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './dashboard.routing';
import { MatchesComponent } from './matches/matches.component';
import { SecNavbarTopComponent } from './sections/sec-navbar-top/sec-navbar-top.component';
import { SecMatchTileComponent } from './sections/sec-match-tile/sec-match-tile.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [MatchesComponent, SecNavbarTopComponent, SecMatchTileComponent],
  exports: [SecNavbarTopComponent, SecMatchTileComponent]
})
export class DashboardModule { }
