import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './pages/base/base.component';
import { UserRouting } from './user.routing';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRouting,
  ],
  declarations: [BaseComponent, UserComponent]
})
export class UserModule { }
