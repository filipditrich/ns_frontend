import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from '../core/services/alerts/alerts.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PageHeaderComponent,
    HeaderComponent,
    SidebarComponent
  ],
  declarations: [PageHeaderComponent, HeaderComponent, SidebarComponent]
})
export class SharedModule { }
