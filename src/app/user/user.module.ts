import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './pages/base/base.component';
import { UserRouting } from './user.routing';
import { UserComponent } from './user.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserRouting,
    SharedModule
  ],
  declarations: [BaseComponent, UserComponent]
})
export class UserModule { }
