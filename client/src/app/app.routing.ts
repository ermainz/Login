import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { MainComponent } from './main/main.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
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
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  // { path: '**', component: PageNotFoundComponent } // TODO add PageNotFoundComponent
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
