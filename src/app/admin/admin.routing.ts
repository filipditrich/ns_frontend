import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseComponent } from './pages/base/base.component';
import { AdminRegistrationRequestsComponent } from './pages/registration-requests/registration-requests.component';
import { AdminComponent } from './admin.component';
import { AdminUserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: BaseComponent },
      { path: 'registration-requests', component: AdminRegistrationRequestsComponent },
      { path: 'user-management', component: AdminUserManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }
