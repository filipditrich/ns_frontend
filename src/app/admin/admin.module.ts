import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './pages/base/base.component';
import { AdminRouting } from './admin.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRegistrationRequestsComponent } from './pages/registration-requests/registration-requests.component';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {SidebarComponent} from '../shared/components/sidebar/sidebar.component';
import {SharedModule} from '../shared/shared.module';
import {AdminComponent} from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRouting,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [AdminComponent, BaseComponent, AdminRegistrationRequestsComponent]
})
export class AdminModule { }
