import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarviewPageRoutingModule } from './carview-routing.module';

import { CarviewPage } from './carview.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CarviewPageRoutingModule],
  declarations: [CarviewPage],
})
export class CarviewPageModule {}
