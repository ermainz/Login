import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppNavComponent } from './app-nav/app-nav.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainComponent } from './main/main.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppNavComponent,
    AppComponent,
    SignInComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
