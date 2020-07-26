import { Component, OnInit } from '@angular/core';
import { ServiciosService} from "../../services/servicios.service"
import Swal from 'sweetalert2'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private _ServiciosService:ServiciosService) { }
 modelousuario={
   nombre:"",
   password:"",
   mail:"",
   activo:"",
   activation_code:"125",
   priv_admin:"",
   usuario:"",
   idsucursal:""
 }
 arregloEmpresa= new Array();
 arregloSucursal= new Array();
  ngOnInit(): void {
    this._ServiciosService.SacarSucursal().subscribe(
      
      Response=>{
     this.arregloSucursal = Response.resultado;
      }
    )
    }
 
  

  guardarUsuario(){
   this._ServiciosService.guardarUsuario(this.modelousuario).subscribe(
     Response=>{
        if (Response.mensaje) {
          Swal.fire(Response.mensaje);
        } else {
          if (Response.resultado) {
            Swal.fire(Response.resultado)
            this.modelousuario={
              nombre:"",
              password:"",
              mail:"",
              activo:"",
              activation_code:"125",
              priv_admin:"",
              usuario:"",
              idsucursal:""
            }
          } 
        }
     }
   )
  }

}
