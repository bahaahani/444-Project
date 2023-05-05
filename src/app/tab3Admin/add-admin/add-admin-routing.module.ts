import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdminPage } from './add-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdminPageRoutingModule {}
