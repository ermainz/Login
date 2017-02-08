import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppNavComponent } from './app-nav/app-nav.component';
import { AppComponent } from './app.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { MainComponent } from './main/main.component';
import { routing } from './app.routing';

// import { ExampleService } from './services/example.service';

@NgModule({
  declarations: [
    AppNavComponent,
    AppComponent,
    LogInFormComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    // ExampleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
