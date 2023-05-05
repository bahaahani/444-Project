import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowroomPageRoutingModule } from './showroom-routing.module';

import { ShowroomPage } from './showroom.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ShowroomPageRoutingModule],
  declarations: [ShowroomPage],
})
export class ShowroomPageModule {}
