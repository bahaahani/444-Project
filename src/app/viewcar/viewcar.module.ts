import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewcarPageRoutingModule } from './viewcar-routing.module';

import { ViewcarPage } from './viewcar.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ViewcarPageRoutingModule],
  declarations: [ViewcarPage],
})
export class ViewcarPageModule {}
