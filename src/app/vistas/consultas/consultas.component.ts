import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "../../services/servicios.service"
import Swal from 'sweetalert2';
import * as numero from 'numero-a-letras';
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  constructor(private _ServiciosService:ServiciosService) { }
   ObjetoAConsultar;
   arregloconsulta= new Array();
   AregloDetalles= new Array();
   facturaselecionada;
   secuencia=1;
   nuevanumeracionfactura="";
   numeracionFactura;
   fechaActual;
   subtotal = 0;
   Clienteselecionado;
   conceptofactura;
   numero_en_letra;
   arregloCliente;
  ngOnInit(): void {
    this._ServiciosService.sacarcliente().subscribe(
      Response => {
        if (Response.mensaje) {
          Swal.fire(Response.mensaje)
         
        } else {
          this.arregloCliente = Response.resultado
        }
      }
    )
  }
  enter(any,tipoconsulta){
  if(any.keyCode ===13 && tipoconsulta ===1){
    this.sacarFacturapornumero();
   console.log("preciono enter")
} 
if(any.keyCode ===13 && tipoconsulta ===2){
  this.sacarporfecha();
 console.log("preciono enter")
} 
}
sacarFacturapornumero(){
  var params={
    numero_factura: this.ObjetoAConsultar
  }
 this._ServiciosService.sacarFacturaPornumero(params).subscribe(
   Response=>{
     if (Response.mensaje) {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: Response.mensaje,
        footer: 'CONTROL DE ERRORES DEL SISTEMA'
      })
      this.arregloconsulta= new Array();
     } else {
        this.arregloconsulta = Response.resultado;
        this.ObjetoAConsultar;
        
     }
   }
 )

}
verdetallesfactura(i){
  var params={
    idfactura:i.idfactura
  }
  this.facturaselecionada = i;
  this._ServiciosService.sacardetalles(params).subscribe(
    Response=>{
      if (Response.mensaje) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: Response.mensaje,
          footer: 'CONTROL DE ERRORES DEL SISTEMA'
        })
      } else {
        this.siguiente(2);
        
        this.AregloDetalles =Response.resultado;
        console.log(Response)
        this.sumar()
      }
    }
  )
}
siguiente(algo){
this.secuencia=algo
}

sumar() {
  this.subtotal=0;
   this.AregloDetalles.forEach(elemento => {
     this.subtotal = ((elemento.precio * elemento.cantidad)-elemento.descuento) +this.subtotal;
   });
   var numeroAconvertir = this.subtotal + (this.subtotal * 0.15);

   var letras = numero.NumerosALetras(numeroAconvertir).replace("Pesos", "Lempiras con")
   letras = letras.replace("Peso", "Lempira con")
   var ultimo = letras.replace("M.N.", "Centavos")
   this.numero_en_letra = ultimo.toUpperCase();

 }
 sacarporfecha(){
   
  var params={
    fecha_emecion: this.ObjetoAConsultar
  }
 this._ServiciosService.sacarfacturaporfecha(params).subscribe(
   Response=>{
     if (Response.mensaje) {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: Response.mensaje,
        footer: 'CONTROL DE ERRORES DEL SISTEMA'
      })
      this.arregloconsulta= new Array();
     } else {
        this.arregloconsulta = Response.resultado;
        this.ObjetoAConsultar;
        console.log(this.arregloconsulta)
     }
   }
 )

}
sacarfacturaporcliente(){
   
  var params={
    idcliente: this.ObjetoAConsultar.idcliente
  }
 this._ServiciosService.sacarfacturaporcliente(params).subscribe(
   Response=>{
     if (Response.mensaje) {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: Response.mensaje,
        footer: 'CONTROL DE ERRORES DEL SISTEMA'
      })
      this.arregloconsulta= new Array();
     } else {
        this.arregloconsulta = Response.resultado;
        this.ObjetoAConsultar;
        console.log(this.arregloconsulta)
     }
   }
 )

}
}
