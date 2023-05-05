import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabsAdmin/tabs2.module').then((m) => m.TabsPageModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./tab1Admin/edit/edit.module').then((m) => m.EditPageModule),
  },
  {
    path: 'addcar',
    loadChildren: () =>
      import('./tab1Admin/addcar/addcar.module').then(
        (m) => m.AddcarPageModule
      ),
  },
  {
    path: 'add-admin',
    loadChildren: () =>
      import('./tab3Admin/add-admin/add-admin.module').then(
        (m) => m.AddAdminPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
