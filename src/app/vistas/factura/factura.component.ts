import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ServiciosService } from "../../services/servicios.service"
import * as numero from 'numero-a-letras';
import Swal from 'sweetalert2'
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(private _ServiciosService: ServiciosService) { }
  secuencia = 0;
  secuencia2 = 1;
  servicionuevo = {
    servicio: "",
    precio: 0,
    descuento: 0,
    cantidad:1,
    total:0,
    codigo_servicio:"",
    idservicios:0
  }
  subtotal = 0;
  arregladeservicios = new Array();
  fechaActual;
  usuario;
  arregloCliente;
  Clienteselecionado;
  numero_en_letra = "";
  numeroAconvertir;
  numeracionFactura;
  nuevanumeracionfactura;
  conceptofactura;
  codigoservicioabuscar;
  ngOnInit(): void {

    moment.locale('es');
    this._ServiciosService.sacarcliente().subscribe(
      Response => {
        if (Response.mensaje) {
          Swal.fire({
            icon: 'error',
            title: "ERROR",
            text: Response.mensaje
          })
         
        } else {
          this.arregloCliente = Response.resultado
        }
      }
    )
    this.fechaActual = "     " + moment().format('lll');
    this.usuario = this._ServiciosService.getuser();
    


  }
  cambiarSecuencia(data) {
    if (data===3) {
      if (this.conceptofactura === undefined) {
        Swal.fire({
          icon: 'error',
          title: "ERROR",
          text: "INGRESE EL CONCEPTO"
        })
        
       }else{
        Swal.fire({
          title: 'Estas Seguro',
          text: "Deseas Generar la Factura",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Acepto'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'LISTO!',
              'TU FACTURA FUE GENERADA CORRECTAMENTE',
              'success'
            )
              this.sacarNumeracionFactura();
              this.secuencia2 = data
          }
        })
       
       }
      
    } else {
      this.secuencia = data;
    }
 
    
  }

  //genera mi formato de factura
  generarFactura(): String {
    var NF = this.numeracionFactura.rango_actual.split("-");
    var data= (parseInt(NF[3]) + 1)+"";
    var cadena = ""
    if (data.length === 1) {
      cadena = "0000000" + data
    } else if (data.length === 2) {
      cadena = "000000" + data
    } else if (data.length === 3) {
      cadena = "00000" + data
    } else if (data.length === 4) {
      cadena = "0000" + data
    } else if (data.length === 5) {
      cadena = "000" + data
    } else if (data.length === 6) {
      cadena = "00" + data
    } else if (data.length === 7) {
      cadena = "0" + data
    } else if (data.length === 8) {
      cadena = "" + data
    }
    var nueva_cadena = NF[0]+"-"+NF[1]+"-"+NF[2]+"-"+cadena
    return nueva_cadena
  }

  aumentarcantidad(i){
        i.cantidad +=1;
        i.total = (i.cantidad * i.precio)-i.descuento;
        return i;
  }
  disminuir(i){
    if(i.cantidad!==1){
      i.cantidad -=1;
      i.total = (i.cantidad * i.precio)-i.descuento;
      return i;
    }
   
}
eliminarproducto(posicion){
  this.arregladeservicios.splice(posicion,1);

}

  sumar() {
   this.subtotal=0;
    this.arregladeservicios.forEach(elemento => {
      this.subtotal = ((elemento.precio * elemento.cantidad)-elemento.descuento) +this.subtotal;
    });
    this.numeroAconvertir = this.subtotal + (this.subtotal * 0.15);

    var letras = numero.NumerosALetras(this.numeroAconvertir).replace("Pesos", "Lempiras con")
    letras = letras.replace("Peso", "Lempira con")
    var ultimo = letras.replace("M.N.", "Centavos")
    this.numero_en_letra = ultimo.toUpperCase();

  }
  siguiente(data) {
    console.log(this.Clienteselecionado)
  if (data===2) {
    
       if (this.Clienteselecionado === undefined) {
        Swal.fire({
          icon: 'error',
          title: "ERROR",
          text: "SELECCIONE EL CLIENTE"
        })
        
       }else{
        this.secuencia2 = data
       }
  } else if(data===4) {
    if (this.arregladeservicios.length===0) {
      Swal.fire({
        icon: 'error',
        title: "ERROR",
        text: "EL CARRITO ESTA VACIO / AGREGUE UN SERVICIO"
      })
      
     }else{
      this.secuencia2 = data
     }
    
  }
     
    
    
    
  }
  sacarNumeracionFactura() {
    var params = {
      idsucursal: this.usuario.idsucursal
    };
    this._ServiciosService.sacarnumeracion(params).subscribe(
      Response => {
        if (Response.mensaje) {
          Swal.fire({
            icon: 'error',
            title: "ERROR",
            text: Response.mensaje
          })
          this.secuencia2 = 4;
  
        } else {
          this.numeracionFactura = Response.resultado[0];
          this.nuevanumeracionfactura=this.generarFactura();
          this.sumar();
          let  facturaGuardar={
            detalles:this.arregladeservicios,
            fecha_emecion:this.fechaActual,
            fecha_venciento:this.fechaActual,
            total:this.subtotal + (this.subtotal * 0.15),
            impuesto:(this.subtotal * 0.15),
            descuento:0,
            idcliente:this.Clienteselecionado.idcliente,
            idsucursal:this.usuario.idsucursal,
            anulado:"Activo",
            idusuario:this.usuario.idusuario,
            numero_factura:this.nuevanumeracionfactura,
            concepto:this.conceptofactura,
            numeracionFactura:this.numeracionFactura.idnumeracion
          }
          
          var params={
            rango_actual:this.nuevanumeracionfactura,
            idnumeracion:this.numeracionFactura.idnumeracion,
            factura:facturaGuardar
          }
          this._ServiciosService.actualizarrangoActual(params).subscribe(
            Response=>{
                  this.secuencia = 3;
             
              
            }
          )
          
       
        }
      }
    )
  }
  enter(any){
    if (any.keyCode===13) {
      this.sacarservicios();
    }
  } 

guardarServicio(){
  var servicios={
    idsucursal:this.usuario.idsucursal,
     servicio:this.servicionuevo.servicio,
     precio_normal:this.servicionuevo.precio,
     codigoservicio:this.servicionuevo.codigo_servicio
  }
  this._ServiciosService.guardarServicios(servicios).subscribe(
    Response=>{
      if (Response.mensaje) {
           Swal.fire({
            icon: 'error',
            title: "ERROR",
            text: Response.mensaje
          })
         
      } else {
        this.servicionuevo.idservicios = Response.resultado.insertId;
        this.servicionuevo.total = (this.servicionuevo.precio*this.servicionuevo.cantidad)-this.servicionuevo.descuento
        this.arregladeservicios.push(this.servicionuevo);
        this.servicionuevo = {
          servicio: "",
          precio: 0,
          descuento: 0,
        cantidad:1,
        total:0,
        codigo_servicio:"",
        idservicios:0
        }
        Swal.fire({
          icon: 'success',
          title: "EXCELENTE",
          text: "GUARDADO CON EXITO"
        })
      }
    }
  )
}
//sacar los servicios por codigo para agregar al servicio
sacarservicios(){

  var params={
    codigoservicio:this.codigoservicioabuscar
  }
 
  this._ServiciosService.sacarservicios(params).subscribe(
    Response=>{
      if (Response.mensaje) {
         
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: Response.mensaje,
          footer: '<a href>CONTROL DE ERRORES DEL SISTEMA</a>'
        })
        this.codigoservicioabuscar=""
      
      }else{
       
        this.servicionuevo.precio = Response.resultado[0].precio_normal;
        this.servicionuevo.servicio = Response.resultado[0].servicio;
        this.servicionuevo.total = (Response.resultado[0].precio_normal*this.servicionuevo.cantidad)-this.servicionuevo.descuento
        this.servicionuevo.idservicios =  Response.resultado[0].idservicio;
        this.servicionuevo.codigo_servicio =  Response.resultado[0].codigoservicio;
        this.arregladeservicios.push(this.servicionuevo);
        this.servicionuevo = {
          servicio: "",
          precio: 0,
          descuento: 0,
         cantidad:1,
        total:0,
        codigo_servicio:"",
        idservicios:0
        }
        this.codigoservicioabuscar=""
      }
    }
  )

}

}
