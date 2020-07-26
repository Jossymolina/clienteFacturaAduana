import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../../services/servicios.service"
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
   modeloSucursal={
     idempresa:"",
     sucursal:"",
     direccion:"",
     telefono:"",
     celular:""
   }
  constructor(private _ServiciosService:ServiciosService) { }
  arregloEmpresa= new Array();
  ngOnInit(): void {
    this._ServiciosService.SacarEmpresa().subscribe(
      Response=>{
       this.arregloEmpresa = Response.resultado;
      }
    )
  }
  guardar(){
    this.modeloSucursal.idempresa = this.arregloEmpresa[0].idempresa;
   this._ServiciosService.guardarSucursal(this.modeloSucursal).subscribe(
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
          text: "GUARDADO",
          footer: 'CONTROL DEL SISTEMA'
        })
        this.   modeloSucursal={
          idempresa:"",
          sucursal:"",
          direccion:"",
          telefono:"",
          celular:""
        }
       }
     }
   )
  }

}
