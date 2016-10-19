import { Component, Input } from '@angular/core';

import { LogInCredentials } from '../models/log-in-credentials';

@Component({
  selector: 'log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent {

  @Input()
  public onSubmit: Function;

  model: LogInCredentials;

  ngOnInit() {
    this.reset();
  }

  submit() {
    console.log("email=" + this.model.email + ", password=" + this.model.password);
    this.reset();
    this.onSubmit();
  }

  reset() {
    this.model = new LogInCredentials('', '');
  }
}
