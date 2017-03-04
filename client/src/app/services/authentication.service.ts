import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private BASE_URL = 'http://localhost:3000/api';

  private currentToken = null;

  constructor (private http: Http) {}

  getExampleResp (): Observable<string> {
    return this.http.get(this.BASE_URL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  register(email, password) {
    var creds = { email, password };
    return this.http.post(this.BASE_URL + '/authenticate/register', creds)
      .map(this.extractData)
      .map( resp => {
        var { success } = resp;
        console.log('success=' + success);
        return success;
      })
      .catch(this.handleError);
  }

  authenticate(email, password) {
    var creds = { email, password };
    return this.http.post(this.BASE_URL + '/authenticate', creds)
      .map(this.extractData)
      .map( resp => {
        var { success, message, token } = resp;
        if (success) {
          console.log('Token=' + token);
          // TODO save token in cookie to attach to all requests
          this.currentToken = token;
        } else {
          console.log('Failed to authenticate: ' + message);
        }
        return success;
      })
      .catch(this.handleError);
  }

  signout() {
    this.currentToken = null;
  }

  isAuthenticated() {
    return this.currentToken !== null;
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
