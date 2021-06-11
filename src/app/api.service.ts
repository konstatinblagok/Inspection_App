import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { CommonService } from './common.function';
// import { HTTP } from '@ionic-native/http/ngx';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }),
};

var headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded');
headers.append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  options: any = {};
  Apiurl: any;
  token = '';
  offlineMode: boolean = false;

  constructor(
    private platform: Platform,
    // private httpAdvanced: HTTP,
    private http: HttpClient,
    public config: CommonService,
    private storage: Storage,
    public alertController: AlertController
  ) {
    // this.configuration_();
    this.options.withCredentials = true;
    this.options.headers = headers;
    // this.Apiurl = "http://localhost:8080/";

    this.token = '';
    // this.token = JSON.parse(
    //   this.config.storageGet('token')['__zone_symbol__value']
    // );
  }

  ionViewDidEnter() {
    // this.token = JSON.parse(
    //   this.config.storageGet('token')['__zone_symbol__value']
    // );
    // this.configuration_();
  }

  HttpRequest(
    method: 'POST' | 'GET' | 'PUT',
    url: string,
    requestBody: any
  ): any {
    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json ',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    url = this.Apiurl + url;

    const headers = {};
  }

  ionViewDidChange() {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  Login(endPoint, data) {
    var httpHeader = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }),
    };
    let send = data;
    let url = this.Apiurl + 'api/' + endPoint;

    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      // alert("adv");
      return this.http.post(url, send, httpHeader).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    } else {
      return this.http.post(url, send, httpHeader).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    }
  }

  Post_data(endPoint, data) {
    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    };
    let url = this.Apiurl + endPoint;
    console.log(httpOptions);

    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      return this.http.post(url, data, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
      // console.log("Advance_HTTP_POST");
      // return from(this.httpAdvanced.post(url, data, httpOptions)).pipe(
      //   map((data: any) => JSON.parse(data?.data))
      // );
    } else {
      return this.http.post(url, data, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    }
  }

  Post_data_Email(endPoint, n) {
    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json ',
        'Content-Type': 'application/json ',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url = this.Apiurl + endPoint;
    console.log(httpOptions);

    let data = {
      id: n.id,
      emailId: n.emailId,
    };
    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      return this.http.post(url, data, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    } else {
      return this.http.post(url, data, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    }
  }

  Post_data_Phone(endPoint, n) {
    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json ',
        'Content-Type': 'application/json ',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url = this.Apiurl + endPoint;
    console.log(httpOptions);

    let data = {
      id: n.id,
      contectNumber: n.contectNumber,
      conuntryCode: n.conuntryCode,
    };
    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      return this.http.post(url, data, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    } else {
      return this.http.post(url, data, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    }
  }

  Put_data(endPoint, data): Observable<any> {
    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json ',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    };
    let url = this.Apiurl + endPoint;
    console.log(httpOptions);

    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      return this.http
        .put(url, data, {
          reportProgress: true,
          observe: 'events',
          headers: new HttpHeaders({
            Accept: 'application/json ',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + this.token,
          }),
        })
        .pipe(
          tap((_) => {}),
          catchError(this.handleError(endPoint))
        );
      // console.log("Advance_HTTP_POST");
      // return from(this.httpAdvanced.put(url, data, httpOptions)).pipe(
      //   map((data: any) => JSON.parse(data?.data))
      // );
    } else {
      return this.http
        .put(url, data, {
          reportProgress: true,
          observe: 'events',
          headers: new HttpHeaders({
            Accept: 'application/json ',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + this.token,
          }),
        })
        .pipe(
          tap((_) => {}),
          catchError(this.handleError(endPoint))
        );
    }

    // return this.http.put(url, data, httpOptions).pipe(
    //   tap((_) => {}),
    //   catchError(this.handleError(endPoint))
    // );
  }

  fileUpload(endPoint, data): Observable<any> {
    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json ',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    };
    let url = this.Apiurl + endPoint;
    console.log(httpOptions);

    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      return this.http
        .put(url, data, {
          reportProgress: true,
          observe: 'events',
          headers: new HttpHeaders({
            Accept: 'application/json ',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + this.token,
          }),
        })
        .pipe(catchError(this.errorMgmt));

      // return this.http.post(url, data, httpOptions).pipe(
      //   tap((_) => {}),
      //   catchError(this.handleError(endPoint))
      // );
      // console.log("Advance_HTTP_POST");
      // return from(this.httpAdvanced.put(url, data, httpOptions)).pipe(
      //   map((data: any) => JSON.parse(data?.data))
      // );
    } else {
      return this.http
        .put(url, data, {
          reportProgress: true,
          observe: 'events',
          headers: new HttpHeaders({
            Accept: 'application/json ',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + this.token,
          }),
        })
        .pipe(catchError(this.errorMgmt));

      // return this.http.put(url, data, httpOptions).pipe(
      //   tap((_) => {}),
      //   catchError(this.handleError(endPoint))
      // );
    }

    // return this.http.put(url, data, httpOptions).pipe(
    //   tap((_) => {}),
    //   catchError(this.handleError(endPoint))
    // );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  Get_data(endPoint) {
    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json ',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    let url = this.Apiurl + endPoint;
    console.log(httpOptions);

    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      return this.http.get(url, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
      // console.log("Advance_HTTP_POST");
      // return from(this.httpAdvanced.get(url, {}, httpOptions)).pipe(
      //   map((data: any) => JSON.parse(data?.data))
      // );
    } else {
      return this.http.get(url, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    }

    // return this.http.get(url, httpOptions).pipe(
    //   tap((_) => {}),
    //   catchError(this.handleError(endPoint))
    // );
  }

  signup(endPoint, body) {
    let send = {};

    let url = this.Apiurl + 'api/' + endPoint;
    return this.http.post(url, send).pipe(
      tap((_) => {}),
      catchError(this.handleError(endPoint))
    );
  }

  get_data(endPoint) {
    let url = this.Apiurl + 'api/' + endPoint;
    // return this.http.get(url).pipe(
    //   tap((_) => {}),
    //   catchError(this.handleError(endPoint))
    // );

    this.token = '';
    this.token = JSON.parse(
      this.config.storageGet('token')['__zone_symbol__value']
    );

    console.log(this.token);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json ',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    if (
      this.platform.is('ios') ||
      this.platform.is('android') ||
      this.platform.is('mobile')
    ) {
      return this.http.get(url, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );

      // console.log("Advance_HTTP_POST");
      // return from(this.httpAdvanced.get(url, {}, httpOptions)).pipe(
      //   map((data: any) => JSON.parse(data?.data))
      // );
    } else {
      return this.http.get(url, httpOptions).pipe(
        tap((_) => {}),
        catchError(this.handleError(endPoint))
      );
    }
  }
}
