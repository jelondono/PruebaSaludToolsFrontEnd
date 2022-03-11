import { ResponseFull } from '../models/RespuestaModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GeneralInterface } from '../models/GeneralModel';

@Injectable({
  providedIn: 'root',
})
export class TipoCitaService {
  API_URI = this.generalInterface.urlApi;

  constructor(
    private http: HttpClient,
    private generalInterface: GeneralInterface
  ) {}

  getTiposCitasMedicas() {
    return this.http.get<ResponseFull>(`${this.API_URI}/listarTipoCitas`);
  }

  alterarTipoCitas(modelTipoCita) {
    return this.http.post<ResponseFull>(
      `${this.API_URI}/alterarInformacionTipoCitas`,
      modelTipoCita
    );
  }

  eliminarTipoCita(idCita) {
    return this.http.get<ResponseFull>(
      `${this.API_URI}/eliminarTipoDeCita/` + idCita
    );
  }
}
