import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "./services/servicios.service"
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
         console.log(Response.mensaje)
    } else {
        if (Response.resultado) {
          console.log(Response)
        this.userlogin= Response.resultado[0] ;
        console.log(this.userlogin)
          this._ServiciosService.mantenertUsuario(Response.resultado[0] )
          this.vanderaDedivs=1;
        } else {
            console.log("OCURRIO UN GRAVE ERROR")
        }
    }
      }
    )
   // 
  }
  cambiarEncabezado(data){
    this.titulodeCard=data;
  }
  
}
