import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private BASE_URL = 'http://localhost:3000/api/user';

  constructor (private authHttp: AuthHttp) {}

  getUsers (): Observable<User[]> {
    return this.authHttp.get(this.BASE_URL)
      .map(this.extractData)
      .map(users => {
        return users.map(userData => User.fromJson(userData));
      })
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
