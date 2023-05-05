import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'showroom',
    loadChildren: () =>
      import('./showroom/showroom.module').then((m) => m.ShowroomPageModule),
  },
  {
    path: 'showroom/:id',
    loadChildren: () =>
      import('./showroom/showroom.module').then((m) => m.ShowroomPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
