import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMatchComponent } from './add-match/add-match.component';
import {routing} from './admin.routing';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [AddMatchComponent, AdminInterfaceComponent],
  exports: [AddMatchComponent, AdminInterfaceComponent]
})
export class AdminModule { }
