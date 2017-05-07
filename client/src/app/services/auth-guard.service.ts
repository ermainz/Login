import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    let isAuthenticated = this.authenticationService.isAuthenticated();
    console.log('AuthGuard#canActive isAuthenticated=' + isAuthenticated);
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
    }
    return isAuthenticated;
  }
}
