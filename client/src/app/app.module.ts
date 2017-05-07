import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppNavComponent } from './app-nav/app-nav.component';
import { AppComponent } from './app.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MainComponent } from './main/main.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { routing } from './app.routing';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';

const TOKEN_KEY = 'id_token';

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: TOKEN_KEY,
    headerPrefix: 'JWT'
  }), http, options);
}

@NgModule({
  declarations: [
    AppNavComponent,
    AppComponent,
    LogInFormComponent,
    RegisterFormComponent,
    LoginRegisterComponent,
    MainComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthenticationService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
