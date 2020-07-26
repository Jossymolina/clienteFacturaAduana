import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../../services/servicios.service"
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
          console.log(Response)
        }
      )
  }
}
