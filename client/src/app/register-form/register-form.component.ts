import { Component, Input } from '@angular/core';

declare var $:any;

import { LogInCredentials } from '../models/log-in-credentials';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  @Input()
  public onRegister: Function;

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
    this.authenticationService.register(this.model.email, this.model.password).subscribe(
      success => {
        this.reset();
        if (success) {
          console.log('Registration successful');
        } else {
          console.log('Registration unsuccessful');
          this.hideError = false;
          $('.alert').alert();
          // TODO pop up failed to log in notification
        }
        this.onRegister(success);
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
