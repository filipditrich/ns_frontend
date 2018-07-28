import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard, PreventLogged, RoleGuard } from './services/auth.guard';
import { UserRoles } from './enums/user.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: '../admin/admin.module#AdminModule',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [ UserRoles.Admin ] }
  },
  {
    path: 'user',
    loadChildren: '../user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule',
    canActivate: [PreventLogged]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventLogged]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRouting { }
