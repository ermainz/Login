import { Component, Input } from '@angular/core';

declare var $:any;

import { LogInCredentials } from '../models/log-in-credentials';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent {

  @Input()
  public onLogin: Function;

  model: LogInCredentials;
  hideError : Boolean;

  constructor(private authenticationService: AuthenticationService) { }

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
        } else {
          console.log('Authentication unsuccessful');
          this.hideError = false;
          $('.alert').alert();
          // TODO pop up failed to log in notification
        }
        this.onLogin(success);
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
