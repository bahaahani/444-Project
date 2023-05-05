import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcarPage } from './addcar.page';

const routes: Routes = [
  {
    path: '',
    component: AddcarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcarPageRoutingModule {}
