import { Component, OnInit } from '@angular/core';
import { ServiciosService} from "../../services/servicios.service"
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
         console.log(Response.mensaje)
       } else {
          console.log(Response.resultado[0])
       }
     }
   )
  }


}
