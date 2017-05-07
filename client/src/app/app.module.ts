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
import { routing } from './app.routing';

import { AuthenticationService } from './services/authentication.service';

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppNavComponent,
    AppComponent,
    LogInFormComponent,
    RegisterFormComponent,
    LoginRegisterComponent,
    MainComponent
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
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
