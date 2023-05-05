import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowroomPage } from './showroom.page';

const routes: Routes = [
  {
    path: '',
    component: ShowroomPage,
  },
  {
    path: 'carview',
    loadChildren: () =>
      import('./carview/carview.module').then((m) => m.CarviewPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowroomPageRoutingModule {}
