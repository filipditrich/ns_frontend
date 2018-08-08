import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseComponent } from './pages/base/base.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: BaseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting { }
