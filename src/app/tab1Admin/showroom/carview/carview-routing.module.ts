import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarviewPage } from './carview.page';

const routes: Routes = [
  {
    path: '',
    component: CarviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarviewPageRoutingModule {}
