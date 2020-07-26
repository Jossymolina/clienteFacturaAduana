import { logging } from 'protractor';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { join } from 'path';
import { JSDocCommentStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  public url= "http://localhost:3977/";
  usuario;
  constructor(public http: HttpClient ) { }
  guardarUsuario(data): Observable<any>{
    var json= JSON.stringify(data);
    let headers = new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    });
         
    return this.http.post(this.url+'Cusuario', json, {headers: headers});
  }
getuser(){
  return this.usuario;

}
mantenertUsuario(data){
   this.usuario = data;
}

  SacarEmpresa(): Observable<any>{
   
    let headers = new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    });
         
    return this.http.get(this.url+'Rempresa', {headers: headers});
  }
  
  guardarSucursal(data): Observable<any>{
    var json= JSON.stringify(data);
    let headers = new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    });
         
    return this.http.post(this.url+'Csucursal',json, {headers: headers});
  }
  SacarSucursal(): Observable<any>{
   
    let headers = new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    });
         
    return this.http.get(this.url+'Rsucursal', {headers: headers});
  }
  guardarCliente(data): Observable<any>{
    var json = JSON.stringify(data);
    let headers= new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    })
    return this.http.post(this.url+"Ccliente",json,{headers: headers})
  }
  login(data): Observable<any>{
    var json = JSON.stringify(data);
    let headers= new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    })
    return this.http.post(this.url+"login",json,{headers: headers})
  }

  sacarcliente(): Observable<any>{
  
    let headers= new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    })
    return this.http.get(this.url+"Rcliente",{headers: headers})
  }

  guardarNumeracion(data): Observable<any>{
    var json = JSON.stringify(data);
    let headers= new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    })
    return this.http.post(this.url+"Cnumeracion",json,{headers: headers})
  }
  
  sacarnumeracion(data): Observable<any>{
  var json =JSON.stringify(data)
    let headers= new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    })
    return this.http.post(this.url+"Rnumeracion",json,{headers: headers})
  }
actualizarrangoActual(data){
  var json = JSON.stringify(data);
  let headers= new HttpHeaders({
    "Content-Type":"application/json",
    "Authorization":localStorage.getItem("token")
  })
  return this.http.post(this.url+"ubdaterangoactual",json,{headers: headers})
}
guardarServicios(data): Observable<any>{
  var json = JSON.stringify(data);
  let headers= new HttpHeaders({
    "Content-Type":"application/json",
    "Authorization":localStorage.getItem("token")
  })
  return this.http.post(this.url+"Cservicios",json,{headers: headers})
     
}
sacarservicios(data): Observable<any>{
  var json =JSON.stringify(data)
    let headers= new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":localStorage.getItem("token")
    })
    return this.http.post(this.url+"Rservicios",json,{headers: headers})
  }
  
}
