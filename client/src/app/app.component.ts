import { Component } from '@angular/core';

import { ExampleService } from './services/example.service';

import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    ExampleService
  ]
})
export class AppComponent {

  constructor( exampleService: ExampleService) {
    exampleService.getExampleResp().subscribe(
      resp => console.log("response: " + JSON.stringify(resp)),
      error => console.log("error: " + error)
    );
  }
}
