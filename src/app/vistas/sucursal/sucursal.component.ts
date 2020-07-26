import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../../services/servicios.service"
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
       console.log(Response)
     }
   )
  }

}
