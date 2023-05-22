import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavPageRoutingModule } from './fav-routing.module';

import { FavPage } from './fav.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavPageRoutingModule
  ],
  declarations: [FavPage]
})
export class FavPageModule {}
