import { NgModule, ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {MatchesComponent} from './matches/matches.component';
import {AuthGuard} from '../../midpoint/auth/auth.guard';
import {AdminComponent} from '../admin/admin.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: MatchesComponent, canActivate: [AuthGuard]}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
