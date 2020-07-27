import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "./services/servicios.service"
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clienteFactura';
  vanderaDedivs=0;
  titulodeCard="Inicio";
  datlog={
    usuario:"",
    password:""
  }
  userlogin;
 constructor(private _ServiciosService:ServiciosService){

 }
ngOnInit(){

}
  nglogin(){
    this._ServiciosService.login(this.datlog).subscribe(
      Response=>{
    if (Response.mensaje) {
      
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: Response.mensaje,
        footer: 'CONTROL DE ERRORES DEL SISTEMA'
      })
    } else {
       
          console.log(Response)
        this.userlogin= Response.resultado[0] ;
        console.log(this.userlogin)
          this._ServiciosService.mantenertUsuario(Response.resultado[0] )
          this.vanderaDedivs=1;
        
          
        
    }
      }
    )
   // 
  }
  cambiarEncabezado(data){
    this.titulodeCard=data;
  }
  
}
