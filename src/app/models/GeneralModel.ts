import { Injectable } from '@angular/core';

@Injectable()
export class GeneralInterface {
  titleWindowPlatform?: string;
  namePlatform?: string;
  urlApi?: string;
  urlWebSocket?: string;

  constructor() {
    this.titleWindowPlatform = 'PRUEBA SALUDTOOLS';
    this.namePlatform = 'PRUEBA SALUDTOOLS';
    this.urlApi = 'http://localhost:9000/api';
  }
}
