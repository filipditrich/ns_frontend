import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMatchComponent } from './add-match/add-match.component';
import {routing} from './admin.routing';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import {MatDatepickerModule} from '@angular/material';
import {MomentModule} from 'angular2-moment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MatDatepickerModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddMatchComponent, AdminInterfaceComponent],
  exports: [AddMatchComponent, AdminInterfaceComponent]
})
export class AdminModule { }
