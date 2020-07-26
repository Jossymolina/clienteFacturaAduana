import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  enter(any){
   
    if(any.keyCode ===13)
{
   console.log("preciono enter")
} }
}
