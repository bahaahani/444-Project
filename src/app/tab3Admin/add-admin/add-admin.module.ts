import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdminPageRoutingModule } from './add-admin-routing.module';

import { AddAdminPage } from './add-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdminPageRoutingModule
  ],
  declarations: [AddAdminPage]
})
export class AddAdminPageModule {}
