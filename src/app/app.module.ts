import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { FacturaComponent } from './vistas/factura/factura.component';
import { ClienteComponent } from './vistas/cliente/cliente.component';
import { EmpresaComponent } from './vistas/empresa/empresa.component';
import { ServiciosComponent } from './vistas/servicios/servicios.component';
import { SucursalComponent } from './vistas/sucursal/sucursal.component';
import { BienvenidoComponent } from './vistas/bienvenido/bienvenido.component';
import {FormsModule } from"@angular/forms"
import {HttpClientModule} from '@angular/common/http';
import { TalonarioComponent } from './vistas/talonario/talonario.component';
import {NgxPrintModule} from 'ngx-print';
import { ConsultasComponent } from './vistas/consultas/consultas.component';
const rutas: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'usuario', component: UsuariosComponent },
  { path: 'sucursal', component: SucursalComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'factura', component: FacturaComponent },
  { path: 'talonario', component: TalonarioComponent },
  { path: 'consultas', component: ConsultasComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    FacturaComponent,
    ClienteComponent,
    EmpresaComponent,
    ServiciosComponent,
    SucursalComponent,
    BienvenidoComponent,
    TalonarioComponent,
    ConsultasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    HttpClientModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
