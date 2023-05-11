import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowroomPageRoutingModule } from './showroom-routing.module';

import { ShowroomPage } from './showroom.page';
import { filterCarPipe } from 'src/app/filterCar.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowroomPageRoutingModule,
    filterCarPipe,
  ],
  declarations: [ShowroomPage],
})
export class ShowroomPageModule {}
