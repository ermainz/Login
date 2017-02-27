import { Component, Input } from '@angular/core';

declare var $:any;

import { LogInCredentials } from '../models/log-in-credentials';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [ AuthenticationService ]
})
export class RegisterFormComponent {

  @Input()
  public onSubmit: Function;

  authenticationService: AuthenticationService;

  model: LogInCredentials;
  hideError : Boolean;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  ngOnInit() {
    this.reset();
    this.hideError = true;
  }

  submit() {
    console.log("email=" + this.model.email + ", password=" + this.model.password);
    this.authenticationService.authenticate(this.model.email, this.model.password).subscribe(
      success => {
        this.reset();
        if (success) {
          console.log('Authentication successful');
          this.onSubmit();
        } else {
          console.log('Authentication unsuccessful');
          this.hideError = false;
          $('.alert').alert();
          // TODO pop up failed to log in notification
        }
      }, error => {
        console.log('Error authenticating');
      }
    );
    // TODO show loading indicator while waiting for authentication response
  }

  reset() {
    this.model = new LogInCredentials('', '');
  }

  closeError() {
    this.hideError = true;
  }
}
