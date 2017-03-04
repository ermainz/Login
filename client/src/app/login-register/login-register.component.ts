import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent {

  public onLoginComplete: Function;

  isAuthenticated: Boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  public ngOnInit() {
    this.checkIsAuthenticated();
    this.onLoginComplete = () => {
      console.log('login complete');
    };
  }

  onRegister = (success: Boolean) => {
    console.log('onRegister success=' + success);
    this.checkIsAuthenticated();
  }

  onLogin = (success: Boolean) => {
    console.log('onLogin success=' + success);
    this.checkIsAuthenticated();
  }

  checkIsAuthenticated = () => {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    if (this.isAuthenticated) {
      this.router.navigate(['home']);
    }
  }

}
