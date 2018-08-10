import { NgModule, ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import {AuthGuard} from '../../midpoint/auth/auth.guard';
import {AddMatchComponent} from './add-match/add-match.component';
import {AdminInterfaceComponent} from './admin-interface/admin-interface.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: '', component: AdminInterfaceComponent, canActivate: [AuthGuard]},
      {path: 'add-match', component: AddMatchComponent, canActivate: [AuthGuard]}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
