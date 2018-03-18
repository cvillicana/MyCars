import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class AppConfig {
  public apiBaseUrl: string;
  public autoPlaza: string;

  constructor() {
    this.apiBaseUrl = 'http://my-car-share.herokuapp.com/api/v1/';
     // this.apiBaseUrl = 'http://192.168.1.64:8080/api/v1/';
    this.autoPlaza = 'http://guia.autoplaza.com.mx/async/';

    console.debug('AppConfig', this);
  }

  private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
