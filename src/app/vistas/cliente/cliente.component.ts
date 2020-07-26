import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../../services/servicios.service"
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private _ServiciosService:ServiciosService) { }
 modeloCliente={
    nombre:"",
    identidad:"",
    rtn:"",
    tipo_cliente:"",
    telefono:"",
    celular:"",
    email:"",
    ciudad:"",
    direccion:""
 }
  ngOnInit(): void {
  }
  guardarcliente(){
      this._ServiciosService.guardarCliente(this.modeloCliente).subscribe(
        Response=>{
          if (Response.mensaje) {
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: Response.mensaje,
              footer: 'CONTROL DE ERRORES DEL SISTEMA'
            })
             
          } else {
            Swal.fire({
              icon: 'success',
              title: 'EXCELENTE',
              text: "CREADO CON EXITO",
              footer: 'CONTROL  DEL SISTEMA'
            })
            this.modeloCliente={
              nombre:"",
              identidad:"",
              rtn:"",
              tipo_cliente:"",
              telefono:"",
              celular:"",
              email:"",
              ciudad:"",
              direccion:""
           }
          }
        
        }
      )
  }
}
