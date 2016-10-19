import { Component } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {
  public closeModal: Function;

  public ngOnInit() {
    this.closeModal = () => {
      console.log('close the modal!')
      $('#loginModal').modal('hide')
    };
  }

}
