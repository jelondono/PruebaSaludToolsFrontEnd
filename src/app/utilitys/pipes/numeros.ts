import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertMinHours' })
export class ConvertMinHours implements PipeTransform {
  transform(value: string): string {
    /* Convertir numeros a minutos - Se puede usar para convertir a Horas*/
    let resultado = value + ' Minutos';
    return resultado.toString();
  }
}

@Pipe({ name: 'estados' })
export class ConvertirBoolean implements PipeTransform {
  transform(value: boolean): string {
    /* Convertir numeros a minutos - Se puede usar para convertir a Horas*/
    let resultado: string;
    if (value === true) {
      resultado = 'ACTIVO';
    } else {
      resultado = 'INACTIVO';
    }
    return resultado.toString();
  }
}
