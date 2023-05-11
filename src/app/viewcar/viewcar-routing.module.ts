import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewcarPage } from './viewcar.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewcarPageRoutingModule {}
