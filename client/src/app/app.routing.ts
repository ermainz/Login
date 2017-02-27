import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

const appRoutes: Routes = [
  {
    path: 'signup',
    component: LoginRegisterComponent
  },
  {
    path: 'login',
    component: LoginRegisterComponent
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  // { path: '**', component: PageNotFoundComponent } // TODO add PageNotFoundComponent
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
