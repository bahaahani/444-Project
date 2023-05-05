import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs2.page';

const routes: Routes = [
  {
    path: 'tabs2',
    component: TabsPage,
    children: [
      {
        path: 'tab1Admin',
        loadChildren: () =>
          import('../tab1Admin/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2Admin',
        loadChildren: () =>
          import('../tab2Admin/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3Admin',
        loadChildren: () =>
          import('../tab3Admin/tab3.module').then((m) => m.Tab3PageModule),
      },

      {
        path: '',
        redirectTo: '/tabs2/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs2/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
