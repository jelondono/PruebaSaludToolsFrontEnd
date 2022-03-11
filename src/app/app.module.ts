import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralInterface } from './models/GeneralModel';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './components/crud/crud.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxColorsModule } from 'ngx-colors';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ConvertMinHours } from './utilitys/pipes/numeros';
import { TipoCitaService } from './services/tipo-cita.service';

@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    NavigationComponent,
    ConvertMinHours,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    NgxColorsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    BrowserAnimationsModule,
  ],
  providers: [TipoCitaService, GeneralInterface, ConvertMinHours],
  bootstrap: [AppComponent],
})
export class AppModule {}
