import { Component } from '@angular/core';

@Component({
  selector: 'login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent {
  public onLoginComplete: Function;

  public ngOnInit() {
    this.onLoginComplete = () => {
      console.log('login complete');
    };
  }

}
