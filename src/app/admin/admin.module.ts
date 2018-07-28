import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './pages/base/base.component';
import { AdminRouting } from './admin.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRegistrationRequestsComponent } from './pages/registration-requests/registration-requests.component';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRouting,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [BaseComponent, AdminRegistrationRequestsComponent, PageHeaderComponent]
})
export class AdminModule { }
