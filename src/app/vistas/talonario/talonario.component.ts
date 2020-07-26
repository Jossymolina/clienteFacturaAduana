import { Component, OnInit } from '@angular/core';
import { ServiciosService} from "../../services/servicios.service"
import Swal from 'sweetalert2';
@Component({
  selector: 'app-talonario',
  templateUrl: './talonario.component.html',
  styleUrls: ['./talonario.component.css']
})
export class TalonarioComponent implements OnInit {
  modeloTalonario={
    idsucursal:0,
      cai:"",
      rango_inicio:"",
      rango_fin:"",
      fecha_vencimiento:"",
      rango_actual:"INICIO"
  }

  usuarioLoguiado;
  arregloSucursal;
  constructor(private _ServiciosService:ServiciosService) { }

  ngOnInit(): void {
    this.usuarioLoguiado = this._ServiciosService.getuser();
 
    this._ServiciosService.SacarSucursal().subscribe(
      Response=>{
        if (Response.mensaje) {
           console.log(Response.mensaje)
        } else {
            this.arregloSucursal= Response.resultado;
     
        }
      }
    )
  }
  guardar(){
   this.modeloTalonario.rango_actual = this.modeloTalonario.rango_inicio;
   this._ServiciosService.guardarNumeracion(this.modeloTalonario).subscribe(
     Response=>{
       if (Response.mensaje) {
         
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: Response.mensaje,
          footer: 'CONTROL  DEL SISTEMA'
        })
        
       } else {
        Swal.fire({
          icon: 'success',
          title: 'EXCELENTE',
          text: "CREADO CON EXITO",
          footer: 'CONTROL  DEL SISTEMA'
        })
        this.modeloTalonario={
          idsucursal:0,
            cai:"",
            rango_inicio:"",
            rango_fin:"",
            fecha_vencimiento:"",
            rango_actual:"INICIO"
        }
         
       }
     }
   )
  }


}
