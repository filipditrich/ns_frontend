import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseComponent } from './pages/base/base.component';
import { AdminRegistrationRequestsComponent } from './pages/registration-requests/registration-requests.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent
  },
  {
    path: 'registration-requests',
    component: AdminRegistrationRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }
