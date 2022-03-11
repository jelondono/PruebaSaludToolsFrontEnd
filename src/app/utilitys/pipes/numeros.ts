import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertMinHours' })
export class ConvertMinHours implements PipeTransform {

  transform(value: string): string {
    /* Convertir numeros a minutos - Se puede usar para convertir a Horas*/
    let resultado = value + " Minutos";
    return resultado.toString();
  }
}
