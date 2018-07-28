import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from '../core/services/alerts/alerts.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PageHeaderComponent
  ],
  declarations: [AlertsComponent, PageHeaderComponent]
})
export class SharedModule { }
