import { Component } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';

import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( authenticationService: AuthenticationService) {
    console.log("before getting auth");
    authenticationService.getAuth().subscribe(
      resp => console.log("response: " + resp),
        error => console.log("error: " + error)
    );
    console.log("after getting auth");
  }
}
