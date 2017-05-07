import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

declare var $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {

  isAuthenticated: Boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  public ngOnInit() {
    this.updateIsAuthenticated();
    this.router.events.subscribe(this.routerEventOnNext);
  }

  routerEventOnNext = (event: Event) => {
    if (event instanceof NavigationEnd) {
      this.updateIsAuthenticated();
    }
  }

  signOutClicked() {
    console.log('#signOutClicked');
    this.authenticationService.signout();
    this.isAuthenticated = false;
    this.router.navigateByUrl('/unauthorized');
  }

  updateIsAuthenticated = () => {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

}
