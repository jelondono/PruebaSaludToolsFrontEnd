import { isNullOrUndefined } from 'util';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertType } from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { TipoCitaService } from 'src/app/services/tipo-cita.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CRUDComponent implements OnInit {
  constructor(
    public tipoCitaService: TipoCitaService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  /* Variables para filtrar sin cargar base de datos */
  listadoTipoCitasModel: any;
  listadoTipoCitasModelTemp: any;

  p = 1;
  modalAgregarTipoCita: any;
  modalEditarTipoCita: any;

  filtroTipoCitas: any;

  /* Valores iniciales ranger */
  value: number = 30;
  options: Options = {
    floor: 0,
    ceil: 250,
  };

  formTipoCita: FormGroup;
  ngOnInit(): void {
    this.formTipoCita = this.fb.group({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      duracionMinutos: new FormControl('', Validators.required),
      activo: new FormControl('', Validators.required),
      fecCreacion: new FormControl(''),
      fecActualizacion: new FormControl(''),
    });

    this.getDataTipoCitas();
  }

  /* Guardar tipo Cita */
  addTipoCitaController(tipoForm) {
    console.log(this.formTipoCita);

    this.tipoCitaService
      .alterarTipoCitas(this.formTipoCita.value)
      .subscribe((res) => {
        let estado: SweetAlertType = res.status === 200 ? 'success' : 'error';
        if (tipoForm === 'guardar') {
          Swal.fire('Guardar tipo de cita', res.message, estado);
        } else {
          Swal.fire('Actualizar tipo de cita', res.message, estado);
        }
        if (res.status === 200) {
          this.formTipoCita.reset();
          if (!isNullOrUndefined(this.modalAgregarTipoCita)) {
            this.modalAgregarTipoCita.close();
          } else {
            this.modalEditarTipoCita.close();
          }
        }
        this.getDataTipoCitas();
      });
  }

  /* Consulta la informacion de tipos de citas */
  getDataTipoCitas() {
    this.tipoCitaService.getTiposCitasMedicas().subscribe((data) => {
      this.listadoTipoCitasModel = data.result;
      this.listadoTipoCitasModelTemp = data.result;
    });
  }

  eliminarTipoCita(idCita) {
    Swal.fire({
      title: 'Esta seguro que desea eliminar este tipo de cita?',
      text: 'Recuerde que una vez eliminado no se puede recuperar.!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value === true) {
        this.tipoCitaService.eliminarTipoCita(idCita).subscribe(
          (res) => {
            let estado: SweetAlertType =
              res.status === 200 ? 'success' : 'error';
            Swal.fire('Eliminar tipo cita', res.message, estado);
            this.getDataTipoCitas();
          },

          (err) => {
            Swal.fire(
              'Error!',
              'No se pudo eliminar correctamente, contactese con el administrador del sistema ',
              'error'
            );
            console.error(err);
          }
        );
      }
    });
  }

  /* Metodo de filtros */

  filtrarTipoCitas(event) {
    this.listadoTipoCitasModel = this.listadoTipoCitasModelTemp;
    let filtro = event.target.value.toLowerCase();

    if (!isNullOrUndefined(filtro) && filtro != '') {
      this.listadoTipoCitasModel = this.listadoTipoCitasModelTemp.filter(
        (itemTipoCitas) => {
          /* Se convierten todos los parametros en minusculas y strings */
          let idArray: string = itemTipoCitas.id.toString().toLowerCase();
          let nombreArray: string = itemTipoCitas.nombre.toLowerCase();
          let descripcionArray: string =
            itemTipoCitas.descripcion.toLowerCase();
          let duracionMinutosArray: string = itemTipoCitas.duracionMinutos
            .toString()
            .toLowerCase();
          let activoArray: string = itemTipoCitas.activo
            .toString()
            .toLowerCase();
          let fecCreacionArray: string = itemTipoCitas.fecCreacion
            .toString()
            .toLowerCase();
          let fecActualizacionArray: string = itemTipoCitas.fecActualizacion
            .toString()
            .toLowerCase();

          /* Se busca coincidencias */

          let resultadoFiltroIdArray = !isNullOrUndefined(idArray)
            ? nombreArray.indexOf(filtro)
            : -1;
          let resultadoFiltroNombreArray = !isNullOrUndefined(nombreArray)
            ? nombreArray.indexOf(filtro)
            : -1;
          let resultadoFiltrodescripcionArray = !isNullOrUndefined(
            descripcionArray
          )
            ? descripcionArray.indexOf(filtro)
            : -1;

          let resultadoFiltroDuracionMinutosArray = !isNullOrUndefined(
            duracionMinutosArray
          )
            ? duracionMinutosArray.indexOf(filtro)
            : -1;
          let resultadoFiltroActivoArray = !isNullOrUndefined(activoArray)
            ? activoArray.indexOf(filtro)
            : -1;
          let resultadoFiltrFecCreacionArray = !isNullOrUndefined(
            fecCreacionArray
          )
            ? fecCreacionArray.indexOf(filtro)
            : -1;
          let resultadoFiltrofecActualizacionArray = !isNullOrUndefined(
            fecActualizacionArray
          )
            ? fecActualizacionArray.indexOf(filtro)
            : -1;

          /* Se devuelven las coincidencias */

          return (
            resultadoFiltroIdArray != -1 ||
            resultadoFiltroNombreArray != -1 ||
            resultadoFiltrodescripcionArray != -1 ||
            resultadoFiltroDuracionMinutosArray != -1 ||
            resultadoFiltroActivoArray != -1 ||
            resultadoFiltrFecCreacionArray != -1 ||
            resultadoFiltrofecActualizacionArray != -1
          );
        }
      );
    }
  }

  /* Metodos para el manejo de modales */

  /* Instancia para crear modal */
  openModalAgregarTipoCita(agregarCitaModal) {
    this.modalAgregarTipoCita = this.modalService.open(agregarCitaModal, {
      windowClass: 'globalWrapperModal',
      backdrop: 'static',
      keyboard: false,
    });
  }

  /* Instancia para editar modal */
  openModalEditarTipoCita(editarTipoCitaModal, itemCita) {
    /* Limpiado  de datos pasados */
    this.formTipoCita.setValue({
      id: itemCita.id,
      nombre: itemCita.nombre,
      descripcion: itemCita.descripcion,
      color: itemCita.color,
      duracionMinutos: itemCita.duracionMinutos,
      activo: itemCita.activo,
      fecCreacion: itemCita.fecCreacion,
      fecActualizacion: itemCita.fecActualizacion,
    });

    this.modalEditarTipoCita = this.modalService.open(editarTipoCitaModal, {
      windowClass: 'globalWrapperModal',
      backdrop: 'static',
      keyboard: false,
    });
  }

  cerrarModal(tipo) {
    this.getDataTipoCitas();
    if (tipo === 'guardar') {
      this.modalAgregarTipoCita.close();
    } else {
      this.modalEditarTipoCita.close();
    }
  }
}
