import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowroomPage } from './showroom.page';

const routes: Routes = [
  {
    path: '',
    component: ShowroomPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowroomPageRoutingModule {}
